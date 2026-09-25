import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NegotiationCopilotModal({
  isOpen,
  onClose,
  clause,
  documentText,
  language = 'en',
}) {
  const { t, formatCategory } = useLanguage();
  const [role, setRole] = useState('tenant');
  const [tone, setTone] = useState('professional');
  const [goal, setGoal] = useState('reduce_penalty');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedRedline, setCopiedRedline] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen || !clause) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText,
          clause,
          role,
          tone,
          goal,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate negotiation proposal.');

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'redline') {
      setCopiedRedline(true);
      setTimeout(() => setCopiedRedline(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container negotiation-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="badge-copilot">
              <MessageSquare size={16} />
              <span>{t('negotiate.title').toUpperCase()}</span>
            </div>
            <h2>{t('clauses.card_clause')} {clause.clause_number} — {t('negotiate.title')}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scrollable">
          {/* Clause Context Banner */}
          <div className="clause-context-box">
            <div className="ctx-row">
              <span className="ctx-label">{t('clauses.title')}:</span>
              <strong className="text-capitalize">{formatCategory(clause.category)}</strong>
            </div>
            <div className="ctx-row">
              <span className="ctx-label">{t('clauses.original_text')}:</span>
              <p className="ctx-text">"{clause.clause_text}"</p>
            </div>
            {clause.risk_reason && (
              <div className="ctx-row">
                <span className="ctx-label">{t('risk.top_concerns')}:</span>
                <span className="text-warning-sm">{clause.risk_reason}</span>
              </div>
            )}
          </div>

          {/* Configuration Controls */}
          <div className="negotiation-config-grid">
            <div className="config-item">
              <label>{t('negotiate.select_role')}</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="tenant">{t('negotiate.role_tenant')}</option>
                <option value="employee">{t('negotiate.role_employee')}</option>
                <option value="contractor">{t('negotiate.role_freelancer')}</option>
              </select>
            </div>

            <div className="config-item">
              <label>{t('negotiate.select_tone')}</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">{t('negotiate.tone_professional')}</option>
                <option value="collaborative">{t('negotiate.tone_collaborative')}</option>
                <option value="strict">{t('negotiate.tone_firm')}</option>
              </select>
            </div>
          </div>

          <div className="generate-bar">
            <button
              className="generate-copilot-btn"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-sm"></span> {t('input.analyzing_btn')}
                </>
              ) : (
                <>
                  <Sparkles size={16} /> {t('negotiate.btn_generate')}
                </>
              )}
            </button>
          </div>

          {error && <div className="error-box mt-3">{error}</div>}

          {/* Results Display */}
          {result && (
            <div className="copilot-results mt-4">
              {/* Four Pillars */}
              <div className="four-pillars-inline">
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.what')}</span>
                  <p className="pillar-text">{result.what}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.why')}</span>
                  <p className="pillar-text">{result.why}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.where')}</span>
                  <p className="pillar-text">{result.where}</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-label">{t('clauses.what_next')}</span>
                  <p className="pillar-text highlight-next">{result.what_next}</p>
                </div>
              </div>

              {/* 1. Proposed Redline Replacement Clause */}
              <div className="redline-card mt-3">
                <div className="redline-header">
                  <div className="badge-redline">
                    <ShieldCheck size={14} />
                    <span>{t('negotiate.counter_clause').toUpperCase()}</span>
                  </div>
                  <button
                    className="copy-action-btn"
                    onClick={() => copyToClipboard(result.counter_proposal, 'redline')}
                  >
                    {copiedRedline ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedRedline ? t('modal.copied') : t('modal.copy')}</span>
                  </button>
                </div>
                <div className="redline-body">
                  <pre className="redline-clause-text">{result.counter_proposal}</pre>
                </div>
                {result.changes_made_summary && (
                  <div className="changes-rationale">
                    <strong>{t('clauses.why')}:</strong>
                    <p>{result.changes_made_summary}</p>
                  </div>
                )}
              </div>

              {/* 2. Strategic Talking Points */}
              {result.talking_points && (
                <div className="talking-points-card mt-3">
                  <h4>{t('negotiate.talking_points')}</h4>
                  <ul>
                    {result.talking_points.map((pt, i) => (
                      <li key={i}>
                        <ChevronRight size={14} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Ready-to-Send Formal Email / Letter Draft */}
              {result.formal_draft && (
                <div className="formal-draft-card mt-3">
                  <div className="draft-header">
                    <h4>{t('negotiate.email_draft')}</h4>
                    <button
                      className="copy-action-btn"
                      onClick={() =>
                        copyToClipboard(
                          `Subject: ${result.formal_draft.subject}\n\n${result.formal_draft.body}`,
                          'email'
                        )
                      }
                    >
                      {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedEmail ? t('modal.copied') : t('modal.copy')}</span>
                    </button>
                  </div>
                  <div className="draft-subject">
                    <strong>Subject:</strong> {result.formal_draft.subject}
                  </div>
                  <div className="draft-body">
                    <pre>{result.formal_draft.body}</pre>
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
