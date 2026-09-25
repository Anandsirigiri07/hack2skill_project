import { useState } from 'react';
import { X, Search, BookOpen, HelpCircle } from 'lucide-react';
import { LEGAL_GLOSSARY } from '../utils/glossaryData';
import { useLanguage } from '../context/LanguageContext';

export default function LegalGlossaryModal({ isOpen, onClose, initialSearch = '' }) {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  if (!isOpen) return null;

  const filteredTerms = LEGAL_GLOSSARY.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.simpleMeaning.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog glossary-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="modal-title">{t('glossary.title')}</h2>
              <p className="modal-subtitle">
                {t('glossary.subtitle')}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="modal-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="glossary-search-input"
            placeholder={t('glossary.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')}>
              {t('btn.clear')}
            </button>
          )}
        </div>

        {/* Glossary Terms List */}
        <div className="glossary-list">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, index) => (
              <div key={index} className="glossary-card">
                <div className="glossary-card-top">
                  <h3 className="glossary-term">{term.term}</h3>
                  <span className="glossary-category-pill">{term.category}</span>
                </div>
                <div className="glossary-meaning-box">
                  <span className="glossary-meaning-label">{t('glossary.meaning').toUpperCase()}:</span>
                  <p className="glossary-meaning">{term.simpleMeaning}</p>
                </div>
                {term.example && (
                  <div className="glossary-example-box">
                    <span className="glossary-example-label">{t('glossary.example').toUpperCase()}:</span>
                    <p className="glossary-example">"{term.example}"</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="glossary-empty">
              <HelpCircle size={32} />
              <p>{t('facts.not_specified')}: "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <p className="glossary-disclaimer">
            {t('disclaimer.text')}
          </p>
          <button className="btn-primary" onClick={onClose}>
            {t('modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
