import React from 'react';
import { DollarSign, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FinancialExposureView({ financialExposure = {}, keyFacts = {} }) {
  const { t } = useLanguage();
  const recurring = financialExposure.stated_recurring_commitment || {};
  const deposit = financialExposure.refundable_deposit || {};
  const exitPenalty = financialExposure.conditional_exit_liabilities || {};
  const breach = financialExposure.conditional_breach_penalties || {};
  const escalation = financialExposure.escalation_exposure || {};

  return (
    <div className="financial-exposure-panel">
      <div className="panel-header">
        <div className="badge-finance">
          <DollarSign size={16} />
          <span>{t('financial.title').toUpperCase()}</span>
        </div>
        <h3>{t('financial.worst_case')}</h3>
        <p className="panel-subtitle">
          {t('financial.subtitle')}
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="finance-summary-cards">
        <div className="finance-card recurring">
          <div className="f-icon">📅</div>
          <div className="f-content">
            <span className="f-label">{t('financial.baseline')}</span>
            <div className="f-value">{recurring.formatted_total || '₹2,75,000'}</div>
            <span className="f-sub">{t('financial.rent_over_term')}</span>
          </div>
        </div>

        <div className="finance-card deposit">
          <div className="f-icon">🔒</div>
          <div className="f-content">
            <span className="f-label">{t('financial.deposit_at_risk')}</span>
            <div className="f-value">{deposit.formatted || '₹1,50,000'}</div>
            <span className="f-sub">{t('financial.security_deposit_locked')}</span>
          </div>
        </div>

        <div className="finance-card exit">
          <div className="f-icon">⚠️</div>
          <div className="f-content">
            <span className="f-label">{t('financial.max_penalties')}</span>
            <div className="f-value">{exitPenalty.formatted || '₹75,000'}</div>
            <span className="f-sub">{t('financial.early_exit_penalty')}</span>
          </div>
        </div>
      </div>

      {/* Comprehensive Categorized Exposure Table */}
      <div className="exposure-table-wrap">
        <table className="exposure-table">
          <thead>
            <tr>
              <th>{t('overview.type')}</th>
              <th>{t('checklist.task')}</th>
              <th>{t('financial.worst_case')}</th>
              <th>{t('dates.event')}</th>
              <th>{t('checklist.advice')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="category-pill recurring-pill">{t('financial.baseline')}</span>
              </td>
              <td>
                <strong>{t('facts.monthly_rent')}</strong>
                <div className="text-muted-xs">{recurring.duration_months || 11} {t('facts.duration')}</div>
              </td>
              <td className="amount-col">
                <strong>{keyFacts.monthly_rent || '₹25,000'}</strong> / mo
                <div className="total-badge">{t('financial.worst_case')}: {recurring.formatted_total}</div>
              </td>
              <td>{t('dates.date_period')}</td>
              <td>{t('hero.feature2')}</td>
            </tr>

            <tr>
              <td>
                <span className="category-pill deposit-pill">{t('financial.deposit_at_risk')}</span>
              </td>
              <td>
                <strong>{t('facts.security_deposit')}</strong>
                <div className="text-muted-xs">{t('dates.details')}</div>
              </td>
              <td className="amount-col">
                <strong>{deposit.formatted}</strong>
              </td>
              <td>{t('dates.date_period')}</td>
              <td>{t('checklist.advice')}</td>
            </tr>

            <tr>
              <td>
                <span className="category-pill conditional-pill">{t('financial.max_penalties')}</span>
              </td>
              <td>
                <strong>{t('financial.early_exit_penalty')}</strong>
                <div className="text-muted-xs">{exitPenalty.months_equivalent || 3} {t('facts.duration')}</div>
              </td>
              <td className="amount-col text-danger">
                <strong>{exitPenalty.formatted}</strong>
              </td>
              <td>{t('stress.scenario_1')}</td>
              <td>{t('redflag.recommended_action')}</td>
            </tr>

            <tr>
              <td>
                <span className="category-pill breach-pill">{t('financial.late_fee_estimate')}</span>
              </td>
              <td>
                <strong>{t('facts.penalties')}</strong>
                <div className="text-muted-xs">{t('dates.details')}</div>
              </td>
              <td className="amount-col text-danger">
                <strong>{breach.formatted}</strong>
                <div className="text-muted-xs">10 Days: {breach.projection_10_days}</div>
              </td>
              <td>{t('stress.scenario_2')}</td>
              <td>{t('checklist.advice')}</td>
            </tr>

            <tr>
              <td>
                <span className="category-pill renewal-pill">{t('facts.renewal_terms')}</span>
              </td>
              <td>
                <strong>{t('cat.rent_increase')}</strong>
                <div className="text-muted-xs">{t('dates.details')}</div>
              </td>
              <td className="amount-col">
                <strong>{escalation.rate || '15%'}</strong>
                <div className="text-muted-xs">{escalation.projected_renewal_rent} / mo</div>
              </td>
              <td>{t('facts.end_date')}</td>
              <td>{t('checklist.advice')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="calculation-audit-note">
        <Info size={14} />
        <span>
          <strong>{t('hero.feature2')}:</strong> {t('hero.feature4')} • {t('hero.feature3')}
        </span>
      </div>
    </div>
  );
}
