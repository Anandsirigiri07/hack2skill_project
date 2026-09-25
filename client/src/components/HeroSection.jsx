import { Sparkles, FileText, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onStartAnalysis, onLoadSample, onStartCompare }) {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headline & Action */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="hero-title">
            {t('hero.title_part1')} <span className="gradient-text">{t('hero.title_highlight')}</span>
          </h1>

          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero-features-list">
            <div className="hero-feature-pill">
              <Check size={14} className="check-icon" />
              <span>{t('hero.feature1')}</span>
            </div>
            <div className="hero-feature-pill">
              <Check size={14} className="check-icon" />
              <span>{t('hero.feature2')}</span>
            </div>
            <div className="hero-feature-pill">
              <Check size={14} className="check-icon" />
              <span>{t('hero.feature3')}</span>
            </div>
            <div className="hero-feature-pill">
              <Check size={14} className="check-icon" />
              <span>{t('hero.feature4')}</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onStartAnalysis}>
              <Sparkles size={16} />
              {t('hero.cta_analyze')}
            </button>
            <button className="btn-secondary" onClick={onLoadSample}>
              <span>{t('hero.cta_sample')}</span>
              <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={onStartCompare}>
              <span>⚖️ {t('hero.cta_compare')}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Preview Card matching user screenshot */}
        <div className="hero-preview-col">
          <div className="preview-card-wrapper">
            <div className="preview-card-floating-badge">
              <Sparkles size={16} />
            </div>

            <div className="preview-card-header">
              <div className="preview-card-title-row">
                <FileText size={18} />
                <span>{t('preview.live_badge')}</span>
              </div>
            </div>

            <div className="preview-card-body">
              <div className="preview-metrics-row">
                <div className="preview-metric-box">
                  <span className="preview-metric-label">{t('preview.overall_risk')}</span>
                  <div className="preview-risk-value">
                    <span className="risk-indicator-dot high"></span>
                    <strong>{t('preview.risk_badge')}</strong>
                  </div>
                </div>

                <div className="preview-metric-box">
                  <span className="preview-metric-label">{t('overview.clauses_analyzed')}</span>
                  <strong className="preview-clause-val">10 {t('subnav.clauses')}</strong>
                </div>
              </div>

              <div className="preview-progress-item">
                <div className="preview-progress-header">
                  <span>{t('preview.monthly_rent')}</span>
                  <span className="progress-percent">{t('preview.rent_val')}</span>
                </div>
                <div className="preview-progress-bar">
                  <div className="preview-progress-fill gradient-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="preview-progress-item">
                <div className="preview-progress-header">
                  <span>{t('preview.security_deposit')}</span>
                  <span className="status-complete">{t('preview.deposit_val')}</span>
                </div>
                <div className="preview-progress-bar">
                  <div className="preview-progress-fill red-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="preview-card-actions">
                <button className="preview-btn-primary" onClick={onLoadSample}>
                  {t('hero.cta_sample')}
                </button>
                <button className="preview-btn-outline" onClick={onStartCompare}>
                  {t('hero.cta_compare')}
                </button>
              </div>

              <div className="preview-status-footer">
                <ShieldCheck size={14} />
                <span>{t('hero.feature3')} • {t('hero.feature4')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
