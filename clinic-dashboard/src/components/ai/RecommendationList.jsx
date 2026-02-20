import React from 'react';
import RecommendationCard from './RecommendationCard';

const RecommendationList = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) {
        return <div className="no-data">No AI recommendations available at this time.</div>;
    }

    return (
        <div className="recommendation-list">
            {recommendations.map((rec, index) => (
                <RecommendationCard key={index} recommendation={rec} />
            ))}
            <style>{`
        .recommendation-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .no-data {
          text-align: center;
          padding: 2rem;
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
};

export default RecommendationList;
