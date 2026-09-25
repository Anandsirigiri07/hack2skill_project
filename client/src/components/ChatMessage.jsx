import { Bot, User } from 'lucide-react';
import EvidenceReference from './EvidenceReference';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function ChatMessage({ message, onViewClause }) {
  const { t } = useLanguage();
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-avatar">
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className="message-content">
        <p className="message-text">{sanitize(message.content)}</p>

        {/* Evidence references for assistant messages */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <EvidenceReference
            sources={message.sources}
            onViewClause={onViewClause}
          />
        )}

        {/* Not-found indicator */}
        {!isUser && message.foundInDocument === false && (
          <div className="message-not-found">
            ℹ️ {t('chat.not_found')}
          </div>
        )}
      </div>
    </div>
  );
}

