import React from 'react';

const PageContainer = ({ children }) => {
    return (
        <div className="page-container">
            {children}
            <style>{`
        .page-container {
          min-height: 100vh;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default PageContainer;
