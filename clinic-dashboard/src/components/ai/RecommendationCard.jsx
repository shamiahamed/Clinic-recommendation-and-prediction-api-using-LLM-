import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const RecommendationCard = ({ recommendation }) => {
    const { title, priority, action, impact } = recommendation;

    const getPriorityColor = (p) => {
        switch (p?.toUpperCase()) {
            case 'HIGH': return 'var(--danger)';
            case 'MEDIUM': return 'var(--warning)';
            case 'LOW': return 'var(--accent)';
            default: return 'var(--primary)';
        }
    };

    return (
        <div className="recommendation-card">
            <div className="rec-header">
                <h4 className="rec-title">{title}</h4>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(priority) }}>
                    {priority}
                </span>
            </div>
            <p className="rec-action">
                <strong>Action:</strong> {action}
            </p>
            <p className="rec-impact">
                <strong>Impact:</strong> {impact}
            </p>
            <style>{`
        .recommendation-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          transition: transform 0.2s, background 0.2s;
        }
        .recommendation-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.05);
        }
        .rec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .rec-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          max-width: 75%;
        }
        .priority-badge {
          font-size: 0.7rem;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }
        .rec-action, .rec-impact {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          color: var(--text-muted);
        }
        .rec-action strong, .rec-impact strong {
          color: var(--text-main);
        }
      `}</style>
        </div>
    );
};

export default RecommendationCard;
