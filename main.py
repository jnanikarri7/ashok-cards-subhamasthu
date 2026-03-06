from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from contextlib import asynccontextmanager
from database import engine
from routers import products, orders

# Import the models so SQLModel knows about them before creating tables
import models 

# This runs once when the server starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Creates all tables defined in models.py if they don't exist
    SQLModel.metadata.create_all(engine)
    yield

# Initialize the app with the lifespan
app = FastAPI(
    title="Ashok Cards Subhamasthu API",
    description="Backend for traditional South Indian wedding invitations.",
    version="1.0.0",
    lifespan=lifespan
)

# --- NEW: Include the router ---
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Ashok Cards Subhamasthu API!"}

# Allow Angular frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], # Angular's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Ashok Cards Subhamasthu API!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "connected"}

# To run this: uvicorn main:app --reload