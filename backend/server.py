from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import aiomysql
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# MySQL pool (initialized on startup)
mysql_pool = None


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

@app.on_event("startup")
async def startup_mysql_pool():
    global mysql_pool
    mysql_host = os.environ.get("MYSQL_HOST", "127.0.0.1")
    mysql_port = int(os.environ.get("MYSQL_PORT", "3306"))
    mysql_user = os.environ.get("MYSQL_USER", "root")
    mysql_password = os.environ.get("MYSQL_PASSWORD", "")
    mysql_db = os.environ.get("MYSQL_DB", "test")

    # Create a small pool; adjust as needed
    mysql_pool = await aiomysql.create_pool(
        host=mysql_host,
        port=mysql_port,
        user=mysql_user,
        password=mysql_password,
        db=mysql_db,
        minsize=1,
        maxsize=5,
        autocommit=True,
    )
    app.state.mysql_pool = mysql_pool


@api_router.get("/mysql/health")
async def mysql_health():
    pool = getattr(app.state, "mysql_pool", None)
    if pool is None:
        return {"status": "down", "detail": "pool not initialized"}
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("SELECT VERSION()")
            version_row = await cur.fetchone()
            return {"status": "ok", "version": version_row[0] if version_row else "unknown"}


@api_router.get("/mysql/time")
async def mysql_time():
    pool = getattr(app.state, "mysql_pool", None)
    if pool is None:
        return {"status": "down", "detail": "pool not initialized"}
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute("SELECT NOW()")
            now_row = await cur.fetchone()
            return {"status": "ok", "now": now_row[0].isoformat() if now_row and now_row[0] else None}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    pool = getattr(app.state, "mysql_pool", None)
    if pool is not None:
        pool.close()
        await pool.wait_closed()