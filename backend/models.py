from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    difficulty: str
    explanation: str

class QuizOutput(BaseModel):
    id: Optional[int] = None
    url: str
    title: str
    summary: str
    key_entities: Dict[str, List[str]]
    sections: List[str]
    quiz: List[QuizQuestion]
    related_topics: List[str]
    date_generated: Optional[datetime] = None