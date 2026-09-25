import React from 'react';
import { ShieldAlert, ArrowRight, MessageSquare, Scale, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RedFlagHunter({
  redFlags = [],
  onViewClause,
  onOpenNegotiation,
  onOpenDevilsAdvocate,
  onOpenLegalContext,
}) {
  const { t, formatCategory } = useLanguage();

  if (!redFlags || redFlags.length === 0) {
    return (
      <div className="red-flag-hunter-panel clean-record">
        <div className="clean-record-inner">
          <div className="clean-icon">🛡️</div>
          <h3>0 {t('redflag.title')}</h3>
          <p>{t('risk_level.low_concern')} — {t('facts.title')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="red-flag-hunter-panel">
      <div className="panel-header">
        <div className="header-left">
          <div className="badge-danger">
            <ShieldAlert size={16} />
            <span>{t('subnav.red_flags').toUpperCase()} ({redFlags.length})</span>
          </div>
          <h3>{t('redflag.title')}</h3>
        </div>
        <p className="panel-subtitle">
          {t('redflag.subtitle')}
        </p>
      </div>

      <div className="red-flags-list">
        {redFlags.map((flag, idx) => (
          <div key={idx} className="red-flag-card">
            <div className="card-top">
              <div className="flag-title-area">
                <span className={`severity-tag ${flag.severity === 'Critical' || flag.severity === t('redflag.critical') ? 'critical' : 'warning'}`}>
                  {flag.severity === 'Critical' ? t('redflag.critical') : t('redflag.high_caution')}
                </span>
                <span className="clause-loc-tag">{flag.location}</span>
                <span className="category-tag">{formatCategory(flag.category)}</span>
              </div>
              <button
                className="view-in-doc-btn"
                onClick={() => onViewClause(flag.clause_number)}
                title={t('redflag.view_clause')}
              >
                <span>{t('redflag.view_clause')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 4 Pillars Breakdown: WHAT / WHY / WHERE / WHAT NEXT */}
            <div className="four-pillars-inline">
              <div className="pillar-item">
                <span className="pillar-label">{t('clauses.what')}</span>
                <p className="pillar-text">{flag.issue}</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-label">{t('clauses.why')}</span>
                <p className="pillar-text">{flag.reason}</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-label">{t('clauses.where')}</span>
                <p className="pillar-text">{flag.location}</p>
              </div>
              <div className="pillar-item">
                <span className="pillar-label">{t('clauses.what_next')}</span>
                <p className="pillar-text highlight-next">{flag.recommended_action}</p>
              </div>
            </div>

            {/* Verbatim Excerpt */}
            {flag.original_text && (
              <div className="verbatim-snippet">
                <span className="snippet-label">{t('clauses.original_text')}:</span>
                <p>"{flag.original_text}"</p>
              </div>
            )}

            {/* Interactive Workspace Actions */}
            <div className="card-actions-bar">
              <button
                className="action-pill copilot-pill"
                onClick={() =>
                  onOpenNegotiation({
                    clause_number: flag.clause_number,
                    category: flag.category,
                    clause_text: flag.original_text,
                    risk_reason: flag.reason,
                    what: flag.issue,
                    where: flag.location,
                    what_next: flag.recommended_action,
                  })
                }
              >
                <MessageSquare size={14} />
                <span>{t('clauses.btn_negotiate')}</span>
              </button>

              <button
                className="action-pill devils-pill"
                onClick={() =>
                  onOpenDevilsAdvocate({
                    clause_number: flag.clause_number,
                    category: flag.category,
                    clause_text: flag.original_text,
                    risk_reason: flag.reason,
                  })
                }
              >
                <HelpCircle size={14} />
                <span>{t('clauses.btn_devils_advocate')}</span>
              </button>

              <button
                className="action-pill verify-pill"
                onClick={() =>
                  onOpenLegalContext({
                    clause_number: flag.clause_number,
                    clause_text: flag.original_text,
                  })
                }
              >
                <Scale size={14} />
                <span>{t('clauses.btn_legal_context')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
