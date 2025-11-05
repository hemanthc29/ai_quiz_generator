import React from 'react';

const QuizDisplay = ({ quizData }) => {
  if (!quizData) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>{quizData.title}</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#444' }}>Summary</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>{quizData.summary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#444' }}>Key People</h3>
          <ul style={{ paddingLeft: '20px', color: '#666' }}>
            {quizData.key_entities.people?.map((person, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{person}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#444' }}>Organizations</h3>
          <ul style={{ paddingLeft: '20px', color: '#666' }}>
            {quizData.key_entities.organizations?.map((org, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{org}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#444' }}>Locations</h3>
          <ul style={{ paddingLeft: '20px', color: '#666' }}>
            {quizData.key_entities.locations?.map((location, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{location}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#444' }}>Main Sections</h2>
        <ul style={{ paddingLeft: '20px', color: '#666' }}>
          {quizData.sections?.map((section, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{section}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Quiz Questions</h2>
        {quizData.quiz?.map((question, index) => (
          <div key={index} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#444' }}>
              {index + 1}. {question.question}
            </h3>
            <div style={{ marginLeft: '16px', marginBottom: '12px' }}>
              {question.options?.map((option, optIndex) => (
                <div key={optIndex} style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: '500' }}>{String.fromCharCode(65 + optIndex)}.</span> {option}
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#e6f4ff', padding: '12px', borderRadius: '4px' }}>
              <p style={{ fontWeight: '600', color: '#2d7d46', marginBottom: '4px' }}>Answer: {question.answer}</p>
              <p style={{ color: '#555' }}>
                <span style={{ fontWeight: '500' }}>Explanation:</span> {question.explanation}
              </p>
              <p style={{ marginTop: '4px' }}>
                <span style={{ fontWeight: '500' }}>Difficulty:</span> 
                <span style={{ 
                  marginLeft: '8px', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  backgroundColor: question.difficulty === 'easy' ? '#d4edda' : 
                                  question.difficulty === 'medium' ? '#fff3cd' : 
                                  '#f8d7da',
                  color: question.difficulty === 'easy' ? '#155724' : 
                         question.difficulty === 'medium' ? '#856404' : 
                         '#721c24'
                }}>
                  {question.difficulty}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#444' }}>Related Topics</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {quizData.related_topics?.map((topic, index) => (
            <span key={index} style={{ padding: '6px 12px', backgroundColor: '#e2d9f3', color: '#4b2e83', borderRadius: '20px', fontSize: '14px' }}>
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizDisplay;