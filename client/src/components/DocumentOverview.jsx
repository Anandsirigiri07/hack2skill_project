import { FileText, Zap, Download, ShieldAlert, Sparkles } from 'lucide-react';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function DocumentOverview({
  summary,
  riskLevel,
  riskScore,
  clauseCount,
  documentType,
  fromCache,
  onOpenReport,
  onNewDocument,
}) {
  const { t, formatRiskLevel } = useLanguage();

  const riskClass =
    riskLevel === 'high_concern'
      ? 'risk-high'
      : riskLevel === 'needs_attention'
      ? 'risk-medium'
      : 'risk-low';

  const riskEmoji =
    riskLevel === 'high_concern'
      ? '🔴'
      : riskLevel === 'needs_attention'
      ? '🟡'
      : '🟢';

  return (
    <div className="overview-card animate-in">
      <div className="overview-top-bar">
        <div className="doc-type-badge">
          <Sparkles size={13} />
          <span>{t('overview.type')}: <strong>{documentType || t('overview.title')}</strong></span>
        </div>

        <div className="overview-actions-right">
          {fromCache && (
            <span className="cache-badge" title="Served from memory cache">
              <Zap size={12} /> Fast Cached
            </span>
          )}
          <button className="btn-report-download" onClick={onOpenReport}>
            <Download size={14} />
            <span>{t('report.btn_download')}</span>
          </button>
          <button className="btn-new-doc" onClick={onNewDocument}>
            {t('btn.new_doc')}
          </button>
        </div>
      </div>

      <div className="overview-header">
        <div className="overview-title-row">
          <FileText size={20} className="header-icon" />
          <h2>{t('overview.summary_heading')}</h2>
        </div>
      </div>

      <p className="overview-summary">{sanitize(summary)}</p>

      <div className="overview-metrics">
        <div className={`metric-card ${riskClass}`}>
          <span className="metric-label">{t('overview.overall_risk')}</span>
          <span className="metric-value">{riskEmoji} {formatRiskLevel(riskLevel)}</span>
          <span className="metric-sub">{t('risk.concerns_subtitle')}</span>
        </div>

        <div className="metric-card risk-score-card">
          <span className="metric-label">{t('overview.risk_score')}</span>
          <div className="risk-score-display">
            <span className="risk-score-number">{riskScore}</span>
            <span className="risk-score-max">/ 100</span>
          </div>
          <div className="risk-score-bar">
            <div
              className="risk-score-fill"
              style={{
                width: `${riskScore}%`,
                background:
                  riskScore <= 30
                    ? 'var(--risk-low)'
                    : riskScore <= 60
                    ? 'var(--risk-medium)'
                    : 'var(--risk-high)',
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-label">{t('overview.clauses_analyzed')}</span>
          <span className="metric-value">{clauseCount}</span>
          <span className="metric-sub">100% {t('hero.feature4')}</span>
        </div>
      </div>

      <div className="overview-disclaimer-box">
        <ShieldAlert size={14} />
        <p>
          <strong>{t('hero.feature3')}:</strong> {t('disclaimer.text')}
        </p>
      </div>
    </div>
  );
}
