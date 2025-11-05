import { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '32px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>AI Wiki Quiz Generator</h1>
          <p style={{ color: '#666' }}>Transform Wikipedia articles into engaging quizzes using AI</p>
        </header>

        <div style={{ marginBottom: '24px', borderBottom: '1px solid #ddd' }}>
          <nav style={{ display: 'flex', gap: '32px' }}>
            <button
              onClick={() => setActiveTab('generate')}
              style={{ 
                padding: '16px 4px', 
                borderBottom: activeTab === 'generate' ? '2px solid #007bff' : '2px solid transparent', 
                fontWeight: '500', 
                fontSize: '14px', 
                color: activeTab === 'generate' ? '#007bff' : '#666',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{ 
                padding: '16px 4px', 
                borderBottom: activeTab === 'history' ? '2px solid #007bff' : '2px solid transparent', 
                fontWeight: '500', 
                fontSize: '14px', 
                color: activeTab === 'history' ? '#007bff' : '#666',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Quiz History
            </button>
          </nav>
        </div>

        <main>
          {activeTab === 'generate' ? <GenerateQuizTab /> : <HistoryTab />}
        </main>
      </div>
    </div>
  );
}

export default App;
