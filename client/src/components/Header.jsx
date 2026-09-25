import { Scale, Globe, BookOpen, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'KN' },
];

export default function Header({
  activeNav,
  onNavChange,
  language,
  onLanguageChange,
  onOpenGlossary,
  onLoadSample,
  hasDocument,
}) {
  const { t } = useLanguage();

  return (
    <header className="header-wrapper">
      {/* Top Announcement Beta Banner */}
      <div className="top-announcement-banner">
        <div className="banner-content">
          <Zap size={14} className="banner-icon" />
          <span>
            <strong>{t('brand.name').toUpperCase()}</strong> — {t('banner.title')}
          </span>
          <span className="demo-mode-badge">{t('banner.demo_mode')}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="header-main">
        <div className="header-inner">
          {/* Brand Logo & Name */}
          <div className="header-left">
            <div className="header-brand" onClick={() => onNavChange('home')}>
              <div className="header-logo">
                <Scale size={20} />
              </div>
              <div>
                <span className="header-title">{t('brand.name')}</span>
                <span className="header-badge-tag">{t('brand.version')}</span>
              </div>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="header-nav">
            <button
              className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => onNavChange('home')}
            >
              <span>{t('nav.home')}</span>
            </button>

            <button
              className={`nav-item ${activeNav === 'analyze' ? 'active' : ''}`}
              onClick={() => onNavChange('analyze')}
            >
              <span>{t('nav.analyze')}</span>
            </button>

            <button
              className={`nav-item ${activeNav === 'stress-test' ? 'active' : ''}`}
              onClick={() => onNavChange('stress-test')}
            >
              <span>{t('nav.stress_test')}</span>
              <span className="nav-new-badge">GenAI</span>
            </button>

            <button
              className={`nav-item ${activeNav === 'compare' ? 'active' : ''}`}
              onClick={() => onNavChange('compare')}
            >
              <span>{t('nav.compare')}</span>
            </button>

            <button
              className={`nav-item ${activeNav === 'ask' ? 'active' : ''}`}
              onClick={() => onNavChange('ask')}
            >
              <span>{t('nav.ask')}</span>
            </button>

            <button
              className={`nav-item ${activeNav === 'my-documents' ? 'active' : ''}`}
              onClick={() => onNavChange('my-documents')}
            >
              <span>{t('nav.my_documents')}</span>
            </button>

            <button
              className="nav-item glossary-nav-btn"
              onClick={onOpenGlossary}
            >
              <BookOpen size={14} />
              <span>{t('nav.glossary')}</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="header-right">
            {/* 1-Click Demo Sample Button */}
            <button
              className="sample-demo-btn"
              onClick={onLoadSample}
              title="Quickly test with our realistic sample agreement"
            >
              <Sparkles size={14} />
              <span>{t('nav.load_sample')}</span>
            </button>

            {/* Language Switcher */}
            <div className="language-toggle">
              <Globe size={14} className="language-icon" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => onLanguageChange(lang.code)}
                  title={lang.label}
                >
                  {lang.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
