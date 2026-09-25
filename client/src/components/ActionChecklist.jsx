import { useState } from 'react';
import { CheckSquare, ArrowUpRight, AlertCircle, Info } from 'lucide-react';
import { sanitize } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

export default function ActionChecklist({ checklist, onViewClause }) {
  const { t } = useLanguage();
  const [checkedState, setCheckedState] = useState({});

  if (!checklist || checklist.length === 0) return null;

  const toggleCheck = (index) => {
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = checklist.length;

  return (
    <div className="checklist-card animate-in">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            <CheckSquare size={20} className="header-icon" />
            {t('checklist.title')}
          </h2>
          <p className="section-subtitle">
            {t('checklist.subtitle')}
          </p>
        </div>

        <div className="checklist-progress-pill">
          <span>{completedCount} / {totalCount}</span>
          <div className="mini-progress-bar">
            <div
              className="mini-progress-fill"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="checklist-items">
        {checklist.map((item, idx) => {
          const isDone = !!checkedState[idx];
          const isHighPriority = item.priority === 'high';

          return (
            <div
              key={idx}
              className={`checklist-item-row ${isDone ? 'completed' : ''} ${isHighPriority ? 'high-priority' : ''}`}
            >
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleCheck(idx)}
                />
                <span className="custom-checkbox"></span>
              </label>

              <div className="checklist-content" onClick={() => toggleCheck(idx)}>
                <div className="checklist-title-row">
                  <span className="checklist-task-text">{sanitize(item.task)}</span>
                  {isHighPriority && (
                    <span className="priority-badge high">
                      <AlertCircle size={12} /> {t('checklist.priority_high')}
                    </span>
                  )}
                </div>
                {item.advice && (
                  <p className="checklist-advice">
                    <Info size={13} className="inline-icon" />
                    {sanitize(item.advice)}
                  </p>
                )}
              </div>

              {item.clause_number && (
                <button
                  className="clause-jump-pill"
                  onClick={() => onViewClause(item.clause_number)}
                  title={`${t('redflag.view_clause')} ${item.clause_number}`}
                >
                  <span>{t('clauses.card_clause')} {item.clause_number}</span>
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
