import { ShieldAlert, AlertTriangle, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RiskDashboard({ clauses, activeFilter, onFilterChange, onViewClause }) {
  const { t, formatCategory, formatRiskLevel } = useLanguage();

  const highConcern = clauses.filter((c) => c.risk_level === 'high_concern');
  const needsAttention = clauses.filter((c) => c.risk_level === 'needs_attention');
  const lowConcern = clauses.filter((c) => c.risk_level === 'low_concern');

  const topConcerns = [...highConcern, ...needsAttention].slice(0, 4);

  const categoryFilters = [
    { id: 'all', label: t('clauses.filter_all') },
    { id: 'high_concern', label: `🔴 ${t('risk.high')}` },
    { id: 'needs_attention', label: `🟡 ${t('risk.medium')}` },
    { id: 'rent_payments', label: `💰 ${t('cat.rent_payments')}` },
    { id: 'termination', label: `🚪 ${t('cat.termination')}` },
    { id: 'maintenance', label: `🔧 ${t('cat.maintenance')}` },
    { id: 'restrictions', label: `🚫 ${t('cat.restrictions')}` },
  ];

  return (
    <div className="dashboard-card animate-in">
      <div className="dashboard-header">
        <div className="dashboard-title-col">
          <ShieldAlert size={20} className="header-icon" />
          <h2>{t('risk.title')}</h2>
        </div>
      </div>

      <div className="risk-counts">
        <button
          className={`risk-count-card risk-high-card ${activeFilter === 'high_concern' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('high_concern')}
        >
          <div className="count-icon-row">
            <AlertCircle size={20} />
            <span className="risk-badge-label">{t('risk.high')}</span>
          </div>
          <span className="risk-count-num">{highConcern.length}</span>
          <span className="risk-count-sub">{t('risk.concerns_subtitle')}</span>
        </button>

        <button
          className={`risk-count-card risk-medium-card ${activeFilter === 'needs_attention' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('needs_attention')}
        >
          <div className="count-icon-row">
            <AlertTriangle size={20} />
            <span className="risk-badge-label">{t('risk.medium')}</span>
          </div>
          <span className="risk-count-num">{needsAttention.length}</span>
          <span className="risk-count-sub">{t('risk_level.needs_attention')}</span>
        </button>

        <button
          className={`risk-count-card risk-low-card ${activeFilter === 'low_concern' ? 'active-filter' : ''}`}
          onClick={() => onFilterChange('low_concern')}
        >
          <div className="count-icon-row">
            <CheckCircle size={20} />
            <span className="risk-badge-label">{t('risk.low')}</span>
          </div>
          <span className="risk-count-num">{lowConcern.length}</span>
          <span className="risk-count-sub">{t('risk_level.low_concern')}</span>
        </button>
      </div>

      {/* Category Pills Filter Bar */}
      <div className="category-filters-bar">
        <div className="filter-label-group">
          <Filter size={14} />
          <span>{t('clauses.title')}:</span>
        </div>
        <div className="filter-pills-list">
          {categoryFilters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Concerns preview list */}
      {topConcerns.length > 0 && (
        <div className="top-concerns-box">
          <h3 className="concerns-title">{t('risk.top_concerns')}</h3>
          <div className="concerns-grid">
            {topConcerns.map((clause) => (
              <div
                key={clause.clause_number}
                className={`concern-item-card ${clause.risk_level === 'high_concern' ? 'high' : 'medium'}`}
                onClick={() => onViewClause(clause.clause_number)}
              >
                <div className="concern-card-top">
                  <span className="concern-num">{t('clauses.card_clause')} #{clause.clause_number}</span>
                  <span className="concern-cat">{formatCategory(clause.category)}</span>
                  <span className={`concern-level-pill ${clause.risk_level}`}>
                    {formatRiskLevel(clause.risk_level)}
                  </span>
                </div>
                <p className="concern-summary">{clause.plain_summary || clause.what}</p>
                <div className="concern-action-hint">
                  <span>{t('redflag.view_clause')} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
