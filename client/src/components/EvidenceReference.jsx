import { Hash } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EvidenceReference({ sources, onViewClause }) {
  const { t } = useLanguage();
  if (!sources || sources.length === 0) return null;

  return (
    <div className="evidence-references">
      <p className="evidence-label">{t('chat.sources')}</p>
      <div className="evidence-list">
        {sources.map((source, index) => (
          <button
            key={index}
            className="evidence-chip"
            onClick={() => onViewClause?.(source.clause_number)}
            title={`${t('clauses.card_clause')} ${source.clause_number}`}
          >
            <Hash size={12} />
            <span>{t('clauses.card_clause')} {source.clause_number}</span>
            {source.clause_title && (
              <span className="evidence-title"> — {source.clause_title}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

