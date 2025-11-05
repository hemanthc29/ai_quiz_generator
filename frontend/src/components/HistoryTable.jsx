import React from 'react';

const HistoryTable = ({ history, onShowDetails }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>ID</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Title</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Date Generated</th>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((quiz) => (
            <tr key={quiz.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#333' }}>{quiz.id}</td>
              <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>{quiz.title}</td>
              <td style={{ padding: '12px 16px', fontSize: '14px', color: '#666' }}>
                {new Date(quiz.date_generated).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <button
                  onClick={() => onShowDetails(quiz.id)}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;