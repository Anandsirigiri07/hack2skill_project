import { useState, useEffect, useRef } from 'react';
import { List, Filter } from 'lucide-react';
import ClauseCard from './ClauseCard';
import { useLanguage } from '../context/LanguageContext';

export default function ClauseList({
  clauses,
  activeFilter,
  onFilterChange,
  highlightedClause,
  onAskQuestion,
  onDraftMessage,
  onOpenNegotiation,
  onOpenDevilsAdvocate,
  onOpenLegalContext,
}) {
  const { t } = useLanguage();
  const listRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);

  const categoryGroups = {
    all: { label: t('clauses.filter_all'), emoji: '📋' },
    high_concern: { label: t('clauses.filter_high'), emoji: '🔴' },
    needs_attention: { label: t('clauses.filter_medium'), emoji: '🟡' },
    money: { label: t('cat.rent_payments'), emoji: '💰', categories: ['rent_payments', 'security_deposit', 'rent_increase'] },
    termination: { label: t('cat.termination'), emoji: '🚪', categories: ['termination', 'move_out'] },
    restrictions: { label: t('cat.restrictions'), emoji: '🚫', categories: ['restrictions', 'property_rules', 'guests', 'pets'] },
    maintenance: { label: t('cat.maintenance'), emoji: '🔧', categories: ['maintenance'] },
    legal: { label: t('cat.dispute_resolution'), emoji: '⚖️', categories: ['liability', 'dispute_resolution', 'insurance'] },
  };

  // Scroll to highlighted clause
  useEffect(() => {
    if (highlightedClause != null) {
      const el = document.getElementById(`clause-${highlightedClause}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedClause]);

  const filteredClauses = clauses.filter((clause) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high_concern') return clause.risk_level === 'high_concern';
    if (activeFilter === 'needs_attention') return clause.risk_level === 'needs_attention';

    const group = categoryGroups[activeFilter];
    if (group?.categories) {
      return group.categories.includes(clause.category);
    }
    return true;
  });

  return (
    <div className="clause-list-section animate-in" style={{ animationDelay: '0.3s' }}>
      <div className="clause-list-header">
        <div className="clause-list-title">
          <List size={20} />
          <h2>{t('clauses.title')}</h2>
          <span className="clause-count">{filteredClauses.length} / {clauses.length}</span>
        </div>
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          {t('clauses.filter_all')}
        </button>
      </div>

      {/* Filter chips */}
      <div className={`filter-chips ${showFilters ? 'visible' : ''}`}>
        {Object.entries(categoryGroups).map(([key, group]) => (
          <button
            key={key}
            className={`filter-chip ${activeFilter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            <span>{group.emoji}</span>
            <span>{group.label}</span>
          </button>
        ))}
      </div>

      {/* Clause cards */}
      <div className="clause-cards" ref={listRef}>
        {filteredClauses.length > 0 ? (
          filteredClauses.map((clause) => (
            <ClauseCard
              key={clause.clause_number}
              clause={clause}
              isHighlighted={highlightedClause === clause.clause_number}
              onAskQuestion={onAskQuestion}
              onDraftMessage={onDraftMessage}
              onOpenNegotiation={onOpenNegotiation}
              onOpenDevilsAdvocate={onOpenDevilsAdvocate}
              onOpenLegalContext={onOpenLegalContext}
            />
          ))
        ) : (
          <div className="no-clauses">
            <p>{t('facts.not_specified')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
