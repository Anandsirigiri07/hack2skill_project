import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useLanguage } from '../context/LanguageContext';

export default function ChatBox({
  messages,
  onSendMessage,
  loading,
  onViewClause,
  isOpen,
  onToggle,
  prefillQuestion,
  onClearPrefill,
}) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const starterQuestions = [
    t('chat.starter_1'),
    t('chat.starter_2'),
    t('chat.starter_3'),
    t('chat.starter_4'),
    t('chat.starter_5'),
  ];

  // Handle prefilled question from clause card
  useEffect(() => {
    if (prefillQuestion) {
      setInput(prefillQuestion);
      onClearPrefill();
      if (inputRef.current) inputRef.current.focus();
    }
  }, [prefillQuestion, onClearPrefill]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    onSendMessage(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mobile floating button
  if (!isOpen) {
    return (
      <button className="chat-fab" onClick={onToggle} title={t('chat.fab_title')}>
        <MessageSquare size={22} />
        <span className="chat-fab-label">{t('chat.fab_label')}</span>
      </button>
    );
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-header-title">
          <Sparkles size={16} />
          <h3>{t('chat.header_title')}</h3>
        </div>
        <button className="chat-close-btn" onClick={onToggle}>
          <Minimize2 size={16} />
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <MessageSquare size={32} className="chat-empty-icon" />
            <p className="chat-empty-title">{t('chat.empty_title')}</p>
            <p className="chat-empty-subtitle">
              {t('chat.empty_subtitle')}
            </p>
            <div className="chat-starters">
              {starterQuestions.map((q) => (
                <button
                  key={q}
                  className="starter-chip"
                  onClick={() => {
                    setInput(q);
                    if (inputRef.current) inputRef.current.focus();
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} onViewClause={onViewClause} />
            ))}
            {loading && (
              <div className="chat-message assistant">
                <div className="message-avatar typing">
                  <Sparkles size={16} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          rows={1}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

