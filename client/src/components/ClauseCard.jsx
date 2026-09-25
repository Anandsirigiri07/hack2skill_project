import { useState } from 'react';
import {
  ChevronDown, ChevronUp, AlertCircle, AlertTriangle, CheckCircle,
  FileText, MessageSquare, Send, Hash, Sparkles, BookOpen
} from 'lucide-react';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function ClauseCard({
  clause,
  isHighlighted,
  onAskQuestion,
  onDraftMessage,
  onOpenNegotiation,
  onOpenDevilsAdvocate,
  onOpenLegalContext,
}) {
  const { t, formatCategory, formatRiskLevel } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [explanationLevel, setExplanationLevel] = useState('simple'); // 'simple' | 'detailed' | 'original'

  const riskClass =
    clause.risk_level === 'high_concern'
      ? 'risk-high'
      : clause.risk_level === 'needs_attention'
      ? 'risk-medium'
      : 'risk-low';

  const pillClass =
    clause.risk_level === 'high_concern'
      ? 'pill-high'
      : clause.risk_level === 'needs_attention'
      ? 'pill-medium'
      : 'pill-low';

  const RiskIcon =
    clause.risk_level === 'high_concern'
      ? AlertCircle
      : clause.risk_level === 'needs_attention'
      ? AlertTriangle
      : CheckCircle;

  return (
    <div
      className={`clause-card ${riskClass} ${isHighlighted ? 'highlighted' : ''} ${expanded ? 'expanded' : ''}`}
      id={`clause-${clause.clause_number}`}
    >
      {/* Header — always visible */}
      <div className="clause-header" onClick={() => setExpanded(!expanded)}>
        <div className="clause-header-left">
          <span className="clause-number">
            <Hash size={12} />
            {clause.clause_number}
          </span>
          <span className="clause-category-badge">
            {formatCategory(clause.category)}
          </span>
        </div>

        <div className="clause-header-right">
          <div className={`clause-risk-badge ${pillClass}`}>
            <RiskIcon size={14} />
            <span>{formatRiskLevel(clause.risk_level)}</span>
          </div>
          <button className="clause-expand-icon-btn" aria-label="Toggle details">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Primary Plain Summary */}
      <p className="clause-summary" onClick={() => setExpanded(!expanded)}>
        {sanitize(clause.plain_summary || clause.explanation)}
      </p>

      {/* Expanded details */}
      {expanded && (
        <div className="clause-details">
          {/* Plain Language Level Tabs */}
          <div className="language-level-tabs">
            <button
              className={`level-tab ${explanationLevel === 'simple' ? 'active' : ''}`}
              onClick={() => setExplanationLevel('simple')}
            >
              <Sparkles size={13} />
              {t('clauses.simple_explanation')}
            </button>
            <button
              className={`level-tab ${explanationLevel === 'detailed' ? 'active' : ''}`}
              onClick={() => setExplanationLevel('detailed')}
            >
              <BookOpen size={13} />
              {t('clauses.detailed_breakdown')}
            </button>
            <button
              className={`level-tab ${explanationLevel === 'original' ? 'active' : ''}`}
              onClick={() => setExplanationLevel('original')}
            >
              <FileText size={13} />
              {t('clauses.original_text')}
            </button>
          </div>

          {/* Tab Content */}
          <div className="level-tab-content">
            {explanationLevel === 'simple' && (
              <div className="explanation-box simple">
                <p>{sanitize(clause.simple_explanation || clause.explanation)}</p>
              </div>
            )}

            {explanationLevel === 'detailed' && (
              <div className="explanation-box detailed">
                <p>{sanitize(clause.explanation)}</p>
              </div>
            )}

            {explanationLevel === 'original' && (
              <div className="original-clause-box">
                <div className="original-clause-header">
                  <span className="source-label">{t('clauses.original_text').toUpperCase()} ({t('clauses.card_clause')} {clause.clause_number})</span>
                </div>
                <blockquote className="original-text">
                  {clause.clause_text}
                </blockquote>
              </div>
            )}
          </div>

          {/* 4 Pillars Grounded Breakdown: WHAT / WHY / WHERE / WHAT NEXT */}
          <div className="four-pillars-inline mt-3">
            <div className="pillar-item">
              <span className="pillar-label">{t('clauses.what')}</span>
              <p className="pillar-text">{clause.what || clause.plain_summary || t('overview.type')}</p>
            </div>
            <div className="pillar-item">
              <span className="pillar-label">{t('clauses.why')}</span>
              <p className="pillar-text">{clause.why || clause.risk_reason || clause.explanation}</p>
            </div>
            <div className="pillar-item">
              <span className="pillar-label">{t('clauses.where')}</span>
              <p className="pillar-text">{clause.where || `${t('clauses.card_clause')} ${clause.clause_number}`}</p>
            </div>
            <div className="pillar-item">
              <span className="pillar-label">{t('clauses.what_next')}</span>
              <p className="pillar-text highlight-next">{clause.what_next || clause.suggested_question || t('checklist.advice')}</p>
            </div>
          </div>

          {/* User Impact */}
          {clause.user_impact && (
            <div className="clause-section impact-section">
              <h4 className="clause-section-title">
                <FileText size={14} />
                {t('clauses.why')}
              </h4>
              <p>{sanitize(clause.user_impact)}</p>
            </div>
          )}

          {/* Grounded Evidence Box */}
          <div className="evidence-box">
            <div className="evidence-header">
              <span className="evidence-badge">{t('hero.feature3')}</span>
              <span className="evidence-source">{t('ask.sources')} {t('clauses.card_clause')} {clause.clause_number}</span>
            </div>
            <p className="evidence-quote">
              "{clause.clause_text?.slice(0, 180)}{clause.clause_text?.length > 180 ? '...' : ''}"
            </p>
          </div>

          {/* Advanced Agentic Copilot Action Pills */}
          <div className="clause-workspace-actions-grid mt-3">
            <button
              className="action-pill copilot-pill"
              onClick={(e) => {
                e.stopPropagation();
                onOpenNegotiation && onOpenNegotiation(clause);
              }}
            >
              <MessageSquare size={13} />
              <span>{t('clauses.btn_negotiate')}</span>
            </button>

            <button
              className="action-pill devils-pill"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDevilsAdvocate && onOpenDevilsAdvocate(clause);
              }}
            >
              <Sparkles size={13} />
              <span>{t('clauses.btn_devils_advocate')}</span>
            </button>

            <button
              className="action-pill verify-pill"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLegalContext && onOpenLegalContext(clause);
              }}
            >
              <BookOpen size={13} />
              <span>{t('clauses.btn_legal_context')}</span>
            </button>

            {clause.suggested_question && (
              <button
                className="action-pill ask-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  onAskQuestion(clause.suggested_question);
                }}
              >
                <Send size={13} />
                <span>{t('ask.btn_send')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
