import { useState } from 'react';
import {
  Send, ShieldCheck, AlertCircle, Sparkles,
  HelpCircle, ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AskMyDocumentView({
  documentText,
  messages,
  onSendMessage,
  loading,
  onViewClause,
  onLoadSampleIfEmpty,
}) {
  const { t } = useLanguage();
  const [question, setQuestion] = useState('');

  const samplePrompts = [
    t('ask.q1'),
    t('ask.q2'),
    t('ask.q3'),
    t('ask.q4'),
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!question.trim() || loading || !documentText) return;
    onSendMessage(question.trim());
    setQuestion('');
  };

  const handleChipClick = (q) => {
    setQuestion(q);
    if (documentText) {
      onSendMessage(q);
    }
  };

  return (
    <div className="ask-view-container animate-in">
      <div className="ask-header-card">
        <div className="ask-header-top">
          <div className="ask-title-col">
            <div className="ask-badge">
              <Sparkles size={14} />
              <span>{t('hero.feature3')}</span>
            </div>
            <h2 className="ask-title">
              {t('ask.title')}
            </h2>
            <p className="ask-subtitle">
              {t('ask.subtitle')}
            </p>
          </div>

          <div className="hallucination-protection-badge">
            <ShieldCheck size={18} className="shield-icon" />
            <div>
              <strong>{t('hero.feature4')}</strong>
              <p>{t('disclaimer.text')}</p>
            </div>
          </div>
        </div>

        {/* Suggested Prompts Carousel / Chips */}
        <div className="sample-prompts-bar">
          <span className="prompt-label">{t('ask.suggested_title')}</span>
          <div className="prompt-chips">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                className="prompt-chip"
                onClick={() => handleChipClick(p)}
                title={p}
              >
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {!documentText ? (
        <div className="ask-empty-state">
          <AlertCircle size={36} className="empty-icon" />
          <h3>{t('docs.empty_title')}</h3>
          <p>{t('docs.empty_desc')}</p>
          <button className="btn-primary" onClick={onLoadSampleIfEmpty}>
            <Sparkles size={16} />
            {t('nav.load_sample')}
          </button>
        </div>
      ) : (
        <div className="ask-chat-workspace">
          {/* Messages list */}
          <div className="chat-thread">
            {messages.length === 0 ? (
              <div className="chat-intro-card">
                <HelpCircle size={24} className="intro-icon" />
                <h4>{t('ask.title')}</h4>
                <p>
                  {t('ask.subtitle')}
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`chat-message-row ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === 'user' ? '👤' : '⚖️'}
                  </div>
                  <div className="message-bubble">
                    <p className="message-text">{msg.content}</p>

                    {/* Hallucination Refusal Banner if not found in document */}
                    {msg.foundInDocument === false && (
                      <div className="refusal-alert-box">
                        <ShieldCheck size={14} />
                        <span>
                          <strong>{t('hero.feature4')}:</strong> {t('ask.not_in_doc')}
                        </span>
                      </div>
                    )}

                    {/* Source citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="message-sources-box">
                        <span className="sources-header">{t('ask.sources').toUpperCase()}</span>
                        <div className="sources-list">
                          {msg.sources.map((s, i) => (
                            <div key={i} className="source-reference-item">
                              <button
                                className="source-clause-btn"
                                onClick={() => onViewClause(s.clause_number)}
                              >
                                <span>{t('clauses.card_clause')} {s.clause_number}: {s.clause_title}</span>
                                <ArrowUpRight size={12} />
                              </button>
                              {s.relevant_text && (
                                <p className="source-excerpt">"{s.relevant_text}"</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="chat-message-row assistant">
                <div className="message-avatar">⚖️</div>
                <div className="message-bubble loading-bubble">
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="typing-label">{t('input.analyzing_btn')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input form */}
          <form className="ask-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="ask-text-input"
              placeholder={t('ask.input_placeholder')}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="ask-send-btn"
              disabled={!question.trim() || loading}
            >
              <Send size={16} />
              <span>{t('ask.btn_send')}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
