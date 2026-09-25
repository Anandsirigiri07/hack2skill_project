import React, { useState, useEffect } from 'react';
import { X, Scale, FileText, Globe, Cpu, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LegalContextModal({
  isOpen,
  onClose,
  clause,
  documentText,
  language = 'en',
}) {
  const { t } = useLanguage();
  const [jurisdiction, setJurisdiction] = useState('India (Metros / Model Tenancy Act)');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && clause && documentText) {
      loadVerification();
    } else {
      setData(null);
      setError(null);
    }
  }, [isOpen, clause]);

  const loadVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/verify-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText,
          clauseNumber: clause.clause_number,
          clauseText: clause.clause_text,
          jurisdiction,
          language,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to verify legal context.');

      setData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !clause) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container legal-context-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="badge-context">
              <Scale size={16} />
              <span>{t('context.title').toUpperCase()}</span>
            </div>
            <h2>{t('clauses.card_clause')} {clause.clause_number} — {t('context.title')}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-scrollable">
          {/* Jurisdiction Bar */}
          <div className="jurisdiction-bar">
            <label>{t('context.benchmark')}:</label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              disabled={loading}
            >
              <option value="India (Metros / Model Tenancy Act)">India (Metros: Bangalore, Mumbai, Delhi — MTA Principles)</option>
              <option value="General Commercial Contract Law (Indian Contract Act 1872)">Indian Contract Act 1872 (General Enforceability)</option>
              <option value="International / General Common Law Benchmark">International / Common Law Standards</option>
            </select>
            <button
              className="reverify-btn"
              onClick={loadVerification}
              disabled={loading}
            >
              {t('clauses.btn_legal_context')}
            </button>
          </div>

          {loading && (
            <div className="loading-state-modal">
              <span className="spinner-md"></span>
              <p>{t('input.analyzing_btn')}</p>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          {data && (
            <div className="verification-results mt-3">
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

              {/* TRI-PANE VIEW */}
              <div className="tri-pane-grid mt-3">
                {/* PANE 1: DOCUMENT FACT */}
                <div className="pane-card pane-fact">
                  <div className="pane-header">
                    <FileText size={16} className="text-primary" />
                    <h4>1. {t('clauses.original_text').toUpperCase()}</h4>
                    <span className="pane-badge">{t('hero.feature3')}</span>
                  </div>
                  <div className="pane-content">
                    <div className="fact-item">
                      <strong>{t('clauses.original_text')}:</strong>
                      <blockquote className="quote-box">"{data.document_fact?.verbatim_excerpt}"</blockquote>
                    </div>
                    <div className="fact-item mt-2">
                      <strong>{t('obligations.title')}:</strong>
                      <p>{data.document_fact?.stated_obligation}</p>
                    </div>
                    {data.document_fact?.disclosed_penalties && (
                      <div className="fact-item mt-2">
                        <strong>{t('facts.penalties')}:</strong>
                        <p className="text-danger-sm">{data.document_fact?.disclosed_penalties}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* PANE 2: EXTERNAL STATUTE & BENCHMARKS */}
                <div className="pane-card pane-statute">
                  <div className="pane-header">
                    <Globe size={16} className="text-success" />
                    <h4>2. {t('context.statutory_standard').toUpperCase()}</h4>
                    <span className="pane-badge">{t('hero.feature3')}</span>
                  </div>
                  <div className="pane-content">
                    <div className="fact-item">
                      <strong>{t('context.benchmark')}:</strong>
                      <p className="statute-title">{data.external_information?.applicable_act_or_benchmark}</p>
                    </div>
                    <div className="fact-item mt-2">
                      <strong>{t('context.statutory_standard')}:</strong>
                      <p>{data.external_information?.statutory_or_customary_standard}</p>
                    </div>
                    <div className="fact-item mt-2">
                      <strong>{t('context.comparison')}:</strong>
                      <p className="highlight-benchmark">{data.external_information?.benchmark_comparison}</p>
                    </div>
                  </div>
                </div>

                {/* PANE 3: AI INTERPRETATION */}
                <div className="pane-card pane-interpretation">
                  <div className="pane-header">
                    <Cpu size={16} className="text-info" />
                    <h4>3. {t('context.enforceability').toUpperCase()}</h4>
                    <span className="pane-badge">{t('hero.feature4')}</span>
                  </div>
                  <div className="pane-content">
                    <div className="fact-item">
                      <strong>{t('context.enforceability')}:</strong>
                      <p>{data.ai_interpretation?.balance_assessment}</p>
                    </div>
                    <div className="fact-item mt-2">
                      <strong>{t('risk.top_concerns')}:</strong>
                      <p className="text-warning-sm">{data.ai_interpretation?.key_risk_factor}</p>
                    </div>
                    <div className="fact-item mt-2">
                      <strong>{t('checklist.advice')}:</strong>
                      <p>{data.ai_interpretation?.practical_guidance}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational Disclaimer Banner */}
              <div className="legal-disclaimer-box mt-3">
                <AlertTriangle size={14} />
                <span>
                  <strong>{t('hero.feature3')}:</strong> {t('disclaimer.text')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
