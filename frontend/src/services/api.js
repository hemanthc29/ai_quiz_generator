const API_BASE_URL = 'http://localhost:8001';

export const generateQuiz = async (url) => {
  const response = await fetch(`${API_BASE_URL}/generate_quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate quiz');
  }
  
  return response.json();
};

export const getQuizHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/history`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch quiz history');
  }
  
  return response.json();
};

export const getQuizById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/quiz/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }
  
  return response.json();
};