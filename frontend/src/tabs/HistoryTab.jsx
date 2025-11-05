import React, { useState, useEffect } from 'react';
import { getQuizHistory, getQuizById } from '../services/api';
import HistoryTable from '../components/HistoryTable';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getQuizHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to fetch quiz history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = async (quizId) => {
    try {
      const quizData = await getQuizById(quizId);
      setSelectedQuiz(quizData);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch quiz details');
      console.error('Error fetching quiz details:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '4px solid #007bff', 
          borderTopColor: 'transparent', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <span style={{ marginLeft: '12px', color: '#666' }}>Loading history...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Quiz History</h2>
        
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        
        {history.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '32px' }}>No quiz history found.</p>
        ) : (
          <HistoryTable history={history} onShowDetails={handleShowDetails} />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedQuiz && <QuizDisplay quizData={selectedQuiz} />}
      </Modal>
    </div>
  );
};

export default HistoryTab;