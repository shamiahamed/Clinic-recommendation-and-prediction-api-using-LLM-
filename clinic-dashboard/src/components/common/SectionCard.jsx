import React from 'react';

const SectionCard = ({ title, children, icon: Icon }) => {
    return (
        <div className="section-card glass-morphism animate-fade-in shadow">
            {(title || Icon) && (
                <div className="card-header">
                    {Icon && <Icon size={24} className="icon" />}
                    {title && <h3 className="card-title">{title}</h3>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
            <style>{`
        .section-card {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }
        .icon {
          color: var(--primary);
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .card-content {
          color: var(--text-main);
        }
      `}</style>
        </div>
    );
};

export default SectionCard;
