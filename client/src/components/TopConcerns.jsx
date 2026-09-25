import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TopConcerns({ clauses, onViewClause }) {
  const { t, formatCategory } = useLanguage();
  const concerns = clauses
    .filter((c) => c.risk_level === 'high_concern' || c.risk_level === 'needs_attention')
    .sort((a, b) => {
      const order = { high_concern: 0, needs_attention: 1 };
      return (order[a.risk_level] ?? 2) - (order[b.risk_level] ?? 2);
    })
    .slice(0, 5);

  if (concerns.length === 0) return null;

  return (
    <div className="top-concerns-card animate-in" style={{ animationDelay: '0.15s' }}>
      <div className="top-concerns-header">
        <AlertCircle size={20} />
        <h2>{t('risk.top_concerns')}</h2>
      </div>

      <div className="top-concerns-list">
        {concerns.map((clause, index) => (
          <button
            key={clause.clause_number}
            className="top-concern-row"
            onClick={() => onViewClause(clause.clause_number)}
          >
            <span className="top-concern-rank">{index + 1}</span>
            <div className="top-concern-info">
              <span className="top-concern-category">
                {formatCategory(clause.category)}
              </span>
              <span className="top-concern-summary">{clause.plain_summary}</span>
            </div>
            <span className={`top-concern-badge ${clause.risk_level}`}>
              {clause.risk_level === 'high_concern' ? '🔴' : '🟡'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

