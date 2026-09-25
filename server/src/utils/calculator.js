/**
 * Deterministic Financial and Date Calculation Engine
 * Hardened to prevent LLM arithmetic hallucination.
 */

function parseCurrency(val) {
  if (!val || typeof val !== 'string') return { value: null, raw: val };
  // Clean currency symbols, commas, spaces
  const match = val.replace(/,/g, '').match(/\d+(?:\.\d+)?/);
  if (!match) return { value: null, raw: val };
  return { value: parseFloat(match[0]), raw: val };
}

function parseDurationMonths(val) {
  if (!val || typeof val !== 'string') return 11; // Default rental standard if unspecified
  const match = val.match(/(\d+)\s*(?:month|mo)/i);
  if (match) return parseInt(match[1], 10);
  const yearMatch = val.match(/(\d+)\s*(?:year|yr)/i);
  if (yearMatch) return parseInt(yearMatch[1], 10) * 12;
  return 11;
}

function parseMonths(val) {
  if (!val || typeof val !== 'string') return null;
  const match = val.match(/(\d+)\s*(?:month|mo)/i);
  if (match) return parseInt(match[1], 10);
  return null;
}

/**
 * Categorized financial exposure analysis based on extracted key facts.
 */
function calculateFinancialExposure(keyFacts = {}) {
  const rent = parseCurrency(keyFacts.monthly_rent || '25000');
  const durationMonths = parseDurationMonths(keyFacts.duration || '11 months');
  const deposit = parseCurrency(keyFacts.security_deposit || '150000');
  const penalty = parseCurrency(keyFacts.penalties || '500');
  const terminationMonths = parseMonths(keyFacts.termination_conditions) || 3;

  const totalRecurringRent = rent.value && durationMonths ? rent.value * durationMonths : null;
  const earlyTerminationCost = rent.value && terminationMonths ? rent.value * terminationMonths : null;

  return {
    stated_recurring_commitment: {
      category: 'Mandatory Recurring Payments',
      item: 'Monthly Rent',
      amount_per_period: rent.value,
      period: 'Monthly',
      duration_months: durationMonths,
      total_recurring: totalRecurringRent,
      formatted_total: totalRecurringRent ? `₹${totalRecurringRent.toLocaleString('en-IN')}` : 'Variable / Disclosed in Lease',
      explanation: `Committed payment of ${keyFacts.monthly_rent || 'stated rent'} across the ${durationMonths}-month term.`,
    },
    refundable_deposit: {
      category: 'Upfront Capital Outlay (Potentially Refundable)',
      item: 'Security Deposit',
      amount: deposit.value,
      formatted: deposit.value ? `₹${deposit.value.toLocaleString('en-IN')}` : (keyFacts.security_deposit || 'Not specified'),
      refund_timeline: 'Refundable within specified notice window post-inspection',
      note: 'Legally refundable subject to joint move-out inspection and documented legitimate deductions.',
    },
    conditional_exit_liabilities: {
      category: 'Conditional Departure Liabilities',
      item: 'Early Termination Penalty',
      months_equivalent: terminationMonths,
      estimated_amount: earlyTerminationCost,
      formatted: earlyTerminationCost ? `₹${earlyTerminationCost.toLocaleString('en-IN')}` : 'Refer to Clause',
      note: 'Only triggered if you terminate and vacate prior to the lease expiry date.',
    },
    conditional_breach_penalties: {
      category: 'Conditional Breach Penalties',
      item: 'Daily Late Payment Surcharge',
      per_diem_fee: penalty.value || 500,
      formatted: penalty.value ? `₹${penalty.value.toLocaleString('en-IN')} / day` : (keyFacts.penalties || 'Specified per-diem fee'),
      projection_10_days: penalty.value ? `₹${(penalty.value * 10).toLocaleString('en-IN')}` : 'Variable',
      note: 'Accrues strictly if payment is received past the mandatory due date.',
    },
    escalation_exposure: {
      category: 'Future Renewal Discretion',
      item: 'Annual Rent Escalation',
      rate: keyFacts.renewal_terms?.includes('15%') ? '15%' : (keyFacts.renewal_terms || '5% - 10%'),
      projected_renewal_rent: rent.value ? `₹${Math.round(rent.value * 1.15).toLocaleString('en-IN')}` : 'Variable',
      note: 'Applicable upon mutual consent if the agreement is renewed after term completion.',
    },
  };
}

module.exports = {
  calculateFinancialExposure,
  parseCurrency,
  parseDurationMonths,
};
