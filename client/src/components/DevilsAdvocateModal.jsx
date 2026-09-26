import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Scale, Shield, Users, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getDemoDevilsAdvocateFallback } from '../utils/demoData';

export default function DevilsAdvocateModal({
  isOpen,
  onClose,
  clause,
  documentText,
  language = 'en',
}) {
  const { t, formatCategory } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [copiedCompromise, setCopiedCompromise] = useState(false);

  useEffect(() => {
    if (isOpen && clause && documentText) {
      loadDevilsAdvocate();
    } else {
      setData(null);
      setError(null);
    }
  }, [isOpen, clause]);

  const loadDevilsAdvocate = async () => {
    setLoading(true);
    setError(null);
    try {
      let resultData = null;
      let ok = false;

      try {
        const res = await fetch('/api/negotiate/devils-advocate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText,
            clause,
            language,
          }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const json = await res.json();
          if (json?.success && json?.data) {
            resultData = json.data;
            ok = true;
          }
        }
      } catch (fetchErr) {
        console.warn('Devils advocate API unavailable, using fallback:', fetchErr);
      }

      if (!ok || !resultData) {
        resultData = getDemoDevilsAdvocateFallback(clause, language);
      }

      setData(resultData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !clause) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <div 
        className="modal-container devils-advocate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="devils-advocate-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="badge-devils">
              <HelpCircle size={16} />
              <span>{t('devils.title').toUpperCase()}</span>
            </div>
            <h2 id="devils-advocate-modal-title">{t('clauses.card_clause')} {clause.clause_number} — {t('devils.title')}</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close Devil's advocate dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-scrollable">
          {/* Original Clause Box */}
          <div className="clause-context-box">
            <span className="ctx-label">{t('clauses.card_clause')} {clause.clause_number} ({formatCategory(clause.category)}):</span>
            <p className="ctx-text">"{clause.clause_text}"</p>
          </div>

          {loading && (
            <div className="loading-state-modal">
              <span className="spinner-md"></span>
              <p>{t('input.analyzing_btn')}</p>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          {data && (
            <div className="devils-results mt-3">
              {/* Four Pillars */}
              <div className="four-pillars-inline">
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.what')}</span>
                  <p className="pillar-text">{data.what}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.why')}</span>
                  <p className="pillar-text">{data.why}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.where')}</span>
                  <p className="pillar-text">{data.where}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.what_next')}</span>
                  <p className="pillar-text highlight-next">{data.what_next}</p>
                </div>
              </div>

              {/* Two Perspective Cards */}
              <div className="perspectives-grid mt-3">
                {/* 1. Counterparty Perspective */}
                <div className="perspective-card counterparty">
                  <div className="persp-header">
                    <Users size={16} />
                    <h4>{t('devils.commercial_intent')}</h4>
                  </div>
                  <div className="persp-body">
                    <div className="persp-row">
                      <strong>{t('clauses.why')}:</strong>
                      <p>{data.counterparty_perspective?.legitimate_goal}</p>
                    </div>
                    <div className="persp-row">
                      <strong>{t('risk.title')}:</strong>
                      <p>{data.counterparty_perspective?.business_risk_prevented}</p>
                    </div>
                    <div className="persp-row">
                      <strong>{t('clauses.detailed_breakdown')}:</strong>
                      <p>{data.counterparty_perspective?.explanation}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Signer Perspective */}
                <div className="perspective-card signer">
                  <div className="persp-header">
                    <Shield size={16} />
                    <h4>{t('devils.defense')}</h4>
                  </div>
                  <div className="persp-body">
                    <div className="persp-row">
                      <strong>{t('redflag.title')}:</strong>
                      <p>{data.signer_perspective?.main_vulnerability}</p>
                    </div>
                    <div className="persp-row">
                      <strong>{t('devils.worst_case')}:</strong>
                      <p>{data.signer_perspective?.potential_hardship}</p>
                    </div>
                    <div className="persp-row">
                      <strong>{t('clauses.why')}:</strong>
                      <p>{data.signer_perspective?.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Balanced Compromise */}
              {data.balanced_compromise && (
                <div className="balanced-compromise-card mt-3">
                  <div className="comp-header">
                    <div className="badge-comp">
                      <Scale size={14} />
                      <span>{t('hero.feature3').toUpperCase()}</span>
                    </div>
                    <button
                      className="copy-action-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(data.balanced_compromise?.compromise_clause_text || '');
                        setCopiedCompromise(true);
                        setTimeout(() => setCopiedCompromise(false), 2000);
                      }}
                    >
                      {copiedCompromise ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedCompromise ? t('modal.copied') : t('modal.copy')}</span>
                    </button>
                  </div>
                  <pre className="comp-clause-text">
                    {data.balanced_compromise?.compromise_clause_text}
                  </pre>
                  <div className="comp-rationale">
                    <strong>{t('clauses.why')}:</strong>
                    <p>{data.balanced_compromise?.why_fair_to_both}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
