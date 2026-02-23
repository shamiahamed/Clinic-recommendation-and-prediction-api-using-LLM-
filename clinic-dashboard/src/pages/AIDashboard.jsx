import React, { useState, useEffect } from 'react';
import PageContainer from '../components/common/PageContainer';
import SectionCard from '../components/common/SectionCard';
import RecommendationList from '../components/ai/RecommendationList';
import ChatWindow from '../components/ai/ChatWindow';
import { LayoutDashboard, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { getFinancialRisk, getAiRecommendations } from '../api/aiDashboardApi';

const AIDashboard = () => {
  const [financialData, setFinancialData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Default clinic ID based on your message
  const clinicId = 93622;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        // Fetch both concurrently
        const responses = await Promise.allSettled([
          getFinancialRisk(clinicId),
          getAiRecommendations(clinicId)
        ]);

        if (responses[0].status === 'fulfilled') {
          setFinancialData(responses[0].value);
        } else {
          console.error("Risk API Failed:", responses[0].reason);
          setErrorMessage("Failed to load financial risk data.");
        }

        if (responses[1].status === 'fulfilled') {
          setRecommendations(responses[1].value);
        } else {
          console.error("AI API Failed:", responses[1].reason);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setErrorMessage("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clinicId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader">Analyzing Clinic #{clinicId}...</div>
      <style>{`
        .loader {
          color: var(--primary);
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );

  return (
    <PageContainer>
      <header className="dashboard-header animate-fade-in">
        <div>
          <h1 className="dashboard-title">Clinic AI Dashboard</h1>
          <p className="dashboard-subtitle">Intelligent financial risk analysis and actionable recommendations</p>
        </div>
        <div className="clinic-badge">Clinic ID: #{clinicId}</div>
      </header>

      {errorMessage && (
        <div className="error-banner">
          <AlertTriangle size={20} />
          <span>{errorMessage}</span>
          <style>{`
                        .error-banner {
                            background: rgba(239, 68, 68, 0.1);
                            border: 1px solid var(--danger);
                            color: var(--danger);
                            padding: 1rem;
                            border-radius: 12px;
                            margin-bottom: 2rem;
                            display: flex;
                            align-items: center;
                            gap: 12px;
                        }
                    `}</style>
        </div>
      )}

      {/* Primary Focus: Chat Interface */}
      <div className="main-chat-section">
        <ChatWindow />
      </div>

      {/* Secondary Focus: Analysis & Predictions (Toggleable) */}
      <div className="analysis-section-wrapper animate-fade-in">
        <details className="analysis-details">
          <summary className="analysis-summary glass-morphism">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <LayoutDashboard size={20} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>View Financial Statistics & AI Predictions</span>
            </div>
            <div className="summary-indicator">Click to expand</div>
          </summary>

          <div className="analysis-content pt-6">
            <div className="stats-grid">
              <StatCard
                label="Risk Level"
                value={financialData?.risk_level || 'N/A'}
                icon={AlertTriangle}
                color={financialData?.risk_level === 'LOW' ? 'var(--accent)' : 'var(--danger)'}
              />
              <StatCard
                label="Collection Rate"
                value={financialData?.collection_rate !== undefined ? `${financialData.collection_rate}%` : 'N/A'}
                icon={TrendingUp}
                color="var(--primary)"
              />
              <StatCard
                label="Pending Pct"
                value={financialData?.pending_percentage !== undefined ? `${financialData.pending_percentage}%` : 'N/A'}
                icon={Activity}
                color="var(--warning)"
              />
            </div>

            <SectionCard title="AI Recommendations" icon={TrendingUp}>
              <RecommendationList recommendations={recommendations} />
            </SectionCard>

            <SectionCard title="Risk Details" icon={LayoutDashboard}>
              <div className="risk-details">
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Underlying Issues:</h4>
                {financialData?.reasons && financialData.reasons.length > 0 ? (
                  <ul className="reasons-list">
                    {financialData.reasons.map((reason, i) => (
                      <li key={i}>{reason}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No specific issues identified.</p>
                )}
              </div>
            </SectionCard>
          </div>
        </details>
      </div>

      <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }
        .dashboard-title {
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dashboard-subtitle {
          color: var(--text-muted);
          margin-top: 0.25rem;
        }
        .clinic-badge {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .main-chat-section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* HTML5 Details/Summary Styling */
        .analysis-details {
          width: 100%;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .analysis-summary {
          list-style: none; /* Hide default arrow */
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .analysis-summary::-webkit-details-marker {
          display: none;
        }
        
        .analysis-summary:hover {
          background: rgba(30, 41, 59, 0.9);
        }
        
        .summary-indicator {
          font-size: 0.85rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
        }

        .analysis-details[open] .summary-indicator {
          display: none;
        }

        .pt-6 {
            padding-top: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .reasons-list {
          list-style: none;
        }
        .reasons-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .reasons-list li::before {
          content: "•";
          color: var(--primary);
          font-weight: bold;
        }
      `}</style>
    </PageContainer>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="stat-card glass-morphism">
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      <h3 className="stat-value" style={{ color }}>{value}</h3>
    </div>
    <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}20` }}>
      <Icon size={24} style={{ color }} />
    </div>
    <style>{`
      .stat-card {
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .stat-info {
        display: flex;
        flex-direction: column;
      }
      .stat-label {
        color: var(--text-muted);
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 0.25rem;
      }
      .stat-icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

export default AIDashboard;
