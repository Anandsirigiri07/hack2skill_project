import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SuggestedQuestions({ questions, onAskQuestion }) {
  const { t } = useLanguage();
  if (!questions || questions.length === 0) return null;

  return (
    <div className="suggested-questions">
      <p className="suggested-label">
        <MessageCircle size={14} />
        {t('ask.suggested_title')}
      </p>
      <div className="suggested-list">
        {questions.map((q, index) => (
          <button
            key={index}
            className="suggested-chip"
            onClick={() => onAskQuestion(q)}
          >
            "{q}"
          </button>
        ))}
      </div>
    </div>
  );
}

