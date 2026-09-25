import { DollarSign, Shield, Clock, Calendar, AlertCircle, RefreshCw, Wrench, FileX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function KeyFacts({ keyFacts, onViewClause }) {
  const { t } = useLanguage();
  if (!keyFacts) return null;

  const facts = [
    {
      id: 'rent',
      label: t('facts.monthly_rent'),
      value: keyFacts.monthly_rent,
      icon: DollarSign,
      color: '#4f46e5',
      badge: t('financial.baseline'),
    },
    {
      id: 'deposit',
      label: t('facts.security_deposit'),
      value: keyFacts.security_deposit,
      icon: Shield,
      color: '#0ea5e9',
      badge: t('financial.deposit_at_risk'),
    },
    {
      id: 'duration',
      label: t('facts.duration'),
      value: keyFacts.duration,
      icon: Clock,
      color: '#8b5cf6',
      badge: t('subnav.dates'),
    },
    {
      id: 'notice',
      label: t('facts.notice_period'),
      value: keyFacts.notice_period,
      icon: Calendar,
      color: '#f59e0b',
      badge: t('dates.date_period'),
    },
    {
      id: 'start_date',
      label: `${t('facts.start_date')} / ${t('facts.end_date')}`,
      value: keyFacts.start_date ? `${keyFacts.start_date} → ${keyFacts.end_date || 'Expiry'}` : null,
      icon: Calendar,
      color: '#10b981',
      badge: t('subnav.dates'),
    },
    {
      id: 'renewal',
      label: t('facts.renewal_terms'),
      value: keyFacts.renewal_terms,
      icon: RefreshCw,
      color: '#06b6d4',
      badge: t('facts.renewal_terms'),
    },
    {
      id: 'penalties',
      label: t('facts.penalties'),
      value: keyFacts.penalties,
      icon: AlertCircle,
      color: '#ef4444',
      badge: t('financial.max_penalties'),
    },
    {
      id: 'maintenance',
      label: t('facts.maintenance'),
      value: keyFacts.maintenance_responsibilities,
      icon: Wrench,
      color: '#64748b',
      badge: t('cat.maintenance'),
    },
    {
      id: 'termination',
      label: t('facts.termination'),
      value: keyFacts.termination_conditions,
      icon: FileX,
      color: '#d97706',
      badge: t('cat.termination'),
    },
  ];

  // Filter out any entries that might be completely empty or null
  const validFacts = facts.filter((f) => f.value && f.value !== 'Not specified in document' && f.value !== t('facts.not_specified'));

  return (
    <div className="key-facts-card animate-in">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            <span className="title-icon">📊</span> {t('facts.title')}
          </h2>
          <p className="section-subtitle">
            {t('banner.title')}
          </p>
        </div>
      </div>

      <div className="key-facts-grid">
        {validFacts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.id} className="key-fact-item">
              <div className="fact-icon-col" style={{ background: `${fact.color}15`, color: fact.color }}>
                <Icon size={18} />
              </div>
              <div className="fact-content-col">
                <div className="fact-header-row">
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-badge" style={{ color: fact.color, borderColor: `${fact.color}40` }}>
                    {fact.badge}
                  </span>
                </div>
                <div className="fact-value">{fact.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
