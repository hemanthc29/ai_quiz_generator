from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
from datetime import datetime
from database import engine, Quiz
from sqlalchemy.orm import sessionmaker
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz_from_content
from models import QuizOutput

# Create FastAPI app
app = FastAPI(title="AI Wiki Quiz Generator")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class URLRequest(BaseModel):
    url: str

@app.post("/generate_quiz")
async def generate_quiz(request: URLRequest):
    """
    Generate a quiz from a Wikipedia URL.
    """
    try:
        # Scrape the Wikipedia article
        content, title = scrape_wikipedia(request.url)
        
        # Generate quiz using LLM
        quiz_data = generate_quiz_from_content(content, title)
        quiz_data.url = request.url
        
        # Save to database
        db = SessionLocal()
        try:
            quiz_record = Quiz(
                url=request.url,
                title=title,
                scraped_content=content,
                full_quiz_data=json.dumps(quiz_data.dict())
            )
            db.add(quiz_record)
            db.commit()
            db.refresh(quiz_record)
            
            # Add ID to response
            quiz_data_dict = quiz_data.dict()
            quiz_data_dict["id"] = quiz_record.id
            quiz_data_dict["date_generated"] = quiz_record.date_generated
            quiz_data = QuizOutput(**quiz_data_dict)
            
            return quiz_data
        finally:
            db.close()
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_quiz_history():
    """
    Get a list of all generated quizzes.
    """
    db = SessionLocal()
    try:
        quizzes = db.query(Quiz).all()
        history = []
        for quiz in quizzes:
            history.append({
                "id": quiz.id,
                "url": quiz.url,
                "title": quiz.title,
                "date_generated": quiz.date_generated
            })
        return history
    finally:
        db.close()

@app.get("/quiz/{quiz_id}")
async def get_quiz(quiz_id: int):
    """
    Get a specific quiz by ID.
    """
    db = SessionLocal()
    try:
        quiz_record = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        if not quiz_record:
            raise HTTPException(status_code=404, detail="Quiz not found")
        
        # Deserialize the quiz data
        quiz_data = json.loads(str(quiz_record.full_quiz_data))
        quiz_data["id"] = quiz_record.id
        quiz_data["date_generated"] = quiz_record.date_generated.isoformat() if quiz_record.date_generated is not None else None
        
        return quiz_data
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Wiki Quiz Generator API"}