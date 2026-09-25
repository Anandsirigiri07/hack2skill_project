import { ClipboardList, ArrowUpRight } from 'lucide-react';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function ObligationList({ obligations, onViewClause }) {
  const { t, formatCategory } = useLanguage();
  if (!obligations || obligations.length === 0) return null;

  // Group obligations by category
  const groups = obligations.reduce((acc, curr) => {
    const cat = curr.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {});

  return (
    <div className="obligations-card animate-in">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            <ClipboardList size={20} className="header-icon" />
            {t('obligations.title')}
          </h2>
          <p className="section-subtitle">
            {t('obligations.subtitle')}
          </p>
        </div>
      </div>

      <div className="obligations-grouped-container">
        {Object.entries(groups).map(([category, items]) => {
          const firstIcon = items[0]?.icon || '📋';
          return (
            <div key={category} className="obligation-group-box">
              <div className="obligation-group-header">
                <span className="group-icon">{firstIcon}</span>
                <h3 className="group-title">{formatCategory(category)}</h3>
                <span className="group-count">{items.length}</span>
              </div>

              <div className="obligation-group-items">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="obligation-row"
                    onClick={() => item.clause_number && onViewClause(item.clause_number)}
                  >
                    <div className="obligation-text-col">
                      <p className="obligation-desc">{sanitize(item.description)}</p>
                    </div>

                    {item.clause_number ? (
                      <button
                        className="clause-jump-pill"
                        title={`${t('redflag.view_clause')} ${item.clause_number}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewClause(item.clause_number);
                        }}
                      >
                        <span>{t('clauses.card_clause')} {item.clause_number}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
