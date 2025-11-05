from models import QuizOutput
from typing import Dict, List
import json

def generate_quiz_from_content(content: str, title: str) -> QuizOutput:
    """
    Generate a mock quiz from Wikipedia article content.
    
    Args:
        content (str): The cleaned Wikipedia article content
        title (str): The title of the Wikipedia article
        
    Returns:
        QuizOutput: The generated quiz data
    """
    # Create a mock quiz response
    mock_quiz = {
        "summary": f"This is a summary of the {title} Wikipedia article. The article covers the main aspects of the topic in detail.",
        "key_entities": {
            "people": ["Person A", "Person B"],
            "organizations": ["Organization A", "Organization B"],
            "locations": ["Location A", "Location B"]
        },
        "sections": ["Introduction", "History", "Main Points", "Conclusion"],
        "quiz": [
            {
                "question": f"What is {title} primarily known for?",
                "options": [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],
                "answer": "Option A",
                "difficulty": "easy",
                "explanation": "This is the explanation for why Option A is correct."
            },
            {
                "question": f"What year was {title} established?",
                "options": [
                    "1900",
                    "1950",
                    "2000",
                    "2020"
                ],
                "answer": "1950",
                "difficulty": "medium",
                "explanation": "This is the explanation for why 1950 is the correct answer."
            }
        ],
        "related_topics": ["Related Topic 1", "Related Topic 2", "Related Topic 3"]
    }
    
    # Add the URL and title to the result
    mock_quiz["url"] = ""
    mock_quiz["title"] = title
    
    return QuizOutput(**mock_quiz)