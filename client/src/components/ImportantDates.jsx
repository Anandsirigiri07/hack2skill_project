import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function ImportantDates({ dates, onViewClause }) {
  const { t } = useLanguage();
  if (!dates || dates.length === 0) return null;

  return (
    <div className="dates-card animate-in">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            <Calendar size={20} className="header-icon" />
            {t('dates.title')}
          </h2>
          <p className="section-subtitle">
            {t('dates.subtitle')}
          </p>
        </div>
      </div>

      <div className="dates-grid">
        {dates.map((d, index) => (
          <div key={index} className="date-item-box">
            <div className="date-item-top">
              <div className="date-badge-wrapper">
                <Clock size={14} />
                <span className="date-period">{sanitize(d.date_or_period)}</span>
              </div>
              {d.clause_number && (
                <button
                  className="clause-jump-pill"
                  onClick={() => onViewClause(d.clause_number)}
                  title={`${t('redflag.view_clause')} ${d.clause_number}`}
                >
                  <span>{t('clauses.card_clause')} {d.clause_number}</span>
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>
            <h3 className="date-event-title">{sanitize(d.event)}</h3>
            {d.details && <p className="date-details">{sanitize(d.details)}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
