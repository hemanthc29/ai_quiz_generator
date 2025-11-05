from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment variables or use default
# For MySQL: mysql+pymysql://user:password@host:port/database_name
# For PostgreSQL: postgresql://user:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./quiz_history.db")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=True)

# Create declarative base
Base = declarative_base()

# Define the Quiz model
class Quiz(Base):
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    title = Column(String)
    date_generated = Column(DateTime(timezone=True), server_default=func.now())
    scraped_content = Column(Text)
    full_quiz_data = Column(Text)  # Store JSON as text
    
    def __repr__(self):
        return f"<Quiz(id={self.id}, title='{self.title}')>"

# Create tables
Base.metadata.create_all(bind=engine)