from sqlmodel import create_engine, Session
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # This will automatically read from a .env file or environment variables
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/ashok_cards"
    RAZORPAY_KEY_ID: str = "your_test_key_id"
    RAZORPAY_KEY_SECRET: str = "your_test_key_secret"
    
    class Config:
        env_file = ".env"

settings = Settings()

# Connect to the database
engine = create_engine(settings.DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session