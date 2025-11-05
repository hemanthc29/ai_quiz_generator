# AI Wiki Quiz Generator

A full-stack application that leverages AI to transform unstructured text from Wikipedia articles into structured, engaging, and educational quizzes.

## Features

- Generate quizzes from any Wikipedia article URL
- AI-powered quiz generation with 5-10 questions per article
- Clean, responsive UI built with React and Tailwind CSS
- Quiz history tracking with a database backend
- Detailed quiz display with questions, options, answers, and explanations

## Tech Stack

### Backend
- Python 3.10+
- FastAPI (Web Framework)
- BeautifulSoup4 (Web Scraping)
- LangChain (LLM Integration)
- Google Gemini API (LLM)
- SQLAlchemy (Database ORM)
- SQLite (Database)

### Frontend
- React (UI Framework)
- Vite (Build Tool)
- Tailwind CSS (Styling)

## Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── database.py                 # SQLAlchemy setup and Quiz model
│   ├── models.py                   # Pydantic Schemas for LLM output
│   ├── scraper.py                  # Wikipedia scraping functions
│   ├── llm_quiz_generator.py       # LangChain setup and quiz generation
│   ├── main.py                     # FastAPI application and endpoints
│   ├── requirements.txt            # Python dependencies
│   └── .env                        # Environment variables
└── frontend/
    ├── src/
    │   ├── components/             # Reusable UI components
    │   ├── services/               # API service functions
    │   ├── tabs/                   # Tab components
    │   ├── App.jsx                 # Main application component
    │   └── index.css               # Global styles
    └── index.html                  # HTML entry point
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up your Gemini API key:
   - Create a `.env` file in the backend directory
   - Add your API key: `GEMINI_API_KEY=your_api_key_here`

6. Run the backend server:
   ```
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /generate_quiz` - Generate a quiz from a Wikipedia URL
- `GET /history` - Get a list of all generated quizzes
- `GET /quiz/{quiz_id}` - Get a specific quiz by ID

## Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to the frontend URL (typically http://localhost:5173)
3. Enter a Wikipedia URL in the "Generate Quiz" tab
4. View the generated quiz and explore the quiz history in the "Quiz History" tab

## Database

The application uses SQLite as the default database. The database file (`quiz_history.db`) will be automatically created in the backend directory when you run the application for the first time.