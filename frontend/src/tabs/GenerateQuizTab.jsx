import React, { useState } from 'react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

const GenerateQuizTab = () => {
  const [url, setUrl] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a Wikipedia URL');
      return;
    }

    setLoading(true);
    setError('');
    setQuizData(null);

    try {
      const data = await generateQuiz(url);
      setQuizData(data);
    } catch (err) {
      setError('Failed to generate quiz. Please check the URL and try again.');
      console.error('Error generating quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '24px', marginBottom: '32px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Generate Quiz from Wikipedia</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Enter a Wikipedia URL below to transform the article into an engaging, AI-powered quiz.</p>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Alan_Turing)"
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: loading ? '#ccc' : '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Generating...' : 'Generate Quiz'}
            </button>
          </div>
          {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
        </form>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              border: '4px solid #007bff', 
              borderTopColor: 'transparent', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }}></div>
            <span style={{ marginLeft: '12px', color: '#666' }}>Generating quiz, please wait...</span>
          </div>
        )}
      </div>

      {quizData && (
        <div style={{ marginTop: '24px' }}>
          <QuizDisplay quizData={quizData} />
        </div>
      )}
    </div>
  );
};

export default GenerateQuizTab;