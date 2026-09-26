/**
 * LegalLens AI — Client Unit & Integration Test Suite
 * Tests:
 * 1. Deterministic Financial Calculator
 * 2. Multilingual Dictionary Completeness (EN, HI, KN)
 * 3. Sample Documents & Legal Benchmark Integrity
 * 4. Legal Glossary Terminology Integrity
 * 5. Fail-Closed Demo Data Schema Conformance
 */

import { parseCurrency, parseDurationMonths, calculateFinancialExposure } from '../src/utils/calculator.js';
import { TRANSLATIONS } from '../src/utils/translations.js';
import { SAMPLE_AGREEMENT_A, SAMPLE_AGREEMENT_B } from '../src/utils/sampleDocuments.js';
import { LEGAL_GLOSSARY } from '../src/utils/glossaryData.js';
import { 
  getDemoAnalysisFallback, 
  getDemoStressTestFallback, 
  getDemoComparisonFallback,
  getDemoNegotiationFallback 
} from '../src/utils/demoData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('\n============================================================');
console.log('       LEGAL LENS AI — CLIENT UNIT & SECURITY TEST SUITE    ');
console.log('============================================================\n');

// ── TEST 1: Financial Calculator Precision ────────────────────────
console.log('--- TEST 1: Financial Calculator Precision ---');
const rent = parseCurrency('INR 25,000');
assert(rent.value === 25000, 'Parses standard INR currency format');

const rentComma = parseCurrency('₹1,50,000.00');
assert(rentComma.value === 150000, 'Parses Indian numbering format with rupee symbol');

const durationMo = parseDurationMonths('11 months');
assert(durationMo === 11, 'Parses 11 months duration');

const durationYr = parseDurationMonths('1 year');
assert(durationYr === 12, 'Converts 1 year to 12 months');

const calc = calculateFinancialExposure({
  monthly_rent: '₹25,000',
  duration: '11 months',
  security_deposit: '₹1,50,000',
  penalties: '₹500',
  termination_conditions: '3 months',
});
assert(calc.stated_recurring_commitment.total_recurring === 275000, 'Computes total recurring rent: 25,000 * 11 = ₹2,75,000');
assert(calc.refundable_deposit.amount === 150000, 'Isolates refundable deposit at ₹1,50,000');
assert(calc.conditional_exit_liabilities.estimated_amount === 75000, 'Isolates departure penalty at ₹75,000');
assert(calc.conditional_breach_penalties.per_diem_fee === 500, 'Isolates daily late payment fee at ₹500/day');

// ── TEST 2: Multilingual Dictionary Coverage ──────────────────────
console.log('\n--- TEST 2: Multilingual Dictionary Coverage ---');
assert(TRANSLATIONS.en != null, 'English dictionary loaded');
assert(TRANSLATIONS.hi != null, 'Hindi dictionary loaded');
assert(TRANSLATIONS.kn != null, 'Kannada dictionary loaded');

const testKeys = ['nav.home', 'nav.analyze', 'nav.stress_test', 'nav.compare', 'nav.ask'];
testKeys.forEach(k => {
  assert(TRANSLATIONS.en[k] != null, `EN has key: ${k}`);
  assert(TRANSLATIONS.hi[k] != null, `HI has key: ${k}`);
  assert(TRANSLATIONS.kn[k] != null, `KN has key: ${k}`);
});

// ── TEST 3: Sample Documents Grounding ─────────────────────────────
console.log('\n--- TEST 3: Sample Documents Grounding ---');
assert(typeof SAMPLE_AGREEMENT_A === 'string' && SAMPLE_AGREEMENT_A.length > 500, 'Sample A (One-Sided Tenancy) loaded');
assert(SAMPLE_AGREEMENT_A.includes('25,000'), 'Sample A contains stated rent');
assert(SAMPLE_AGREEMENT_A.includes('three (3) months') || SAMPLE_AGREEMENT_A.includes('penalty'), 'Sample A contains exit forfeiture clause');
assert(typeof SAMPLE_AGREEMENT_B === 'string' && SAMPLE_AGREEMENT_B.length > 500, 'Sample B (Balanced Tenancy) loaded');

// ── TEST 4: Legal Glossary Terms ──────────────────────────────────
console.log('\n--- TEST 4: Legal Glossary Terms ---');
assert(Array.isArray(LEGAL_GLOSSARY) && LEGAL_GLOSSARY.length >= 10, 'Glossary contains at least 10 legal terms');
const indemnity = LEGAL_GLOSSARY.find(t => t.term === 'Indemnity' || t.term?.includes('Indemn'));
assert(indemnity != null && indemnity.simpleMeaning != null, 'Indemnity term includes plain-language definition');

// ── TEST 5: Fail-Closed Demo Data Schema ──────────────────────────
console.log('\n--- TEST 5: Fail-Closed Demo Data Schema ---');
const demoAnalysis = getDemoAnalysisFallback('sample text', 'en');
assert(demoAnalysis.overall_risk_level === 'high_concern', 'Demo analysis exposes overall_risk_level');
assert(demoAnalysis.risk_score === 74, 'Demo analysis exposes risk_score (74)');
assert(Array.isArray(demoAnalysis.clauses) && demoAnalysis.clauses.length >= 8, 'Demo analysis contains 8+ structured clauses');
assert(demoAnalysis.clauses[0].what && demoAnalysis.clauses[0].why && demoAnalysis.clauses[0].where && demoAnalysis.clauses[0].what_next, 'Exposes 4 Pillars of Grounding');

const demoStress = getDemoStressTestFallback('Early termination in 3 months', 'en');
assert(Array.isArray(demoStress.procedural_steps) && demoStress.procedural_steps.length > 0, 'Stress test exposes procedural steps');

const demoComp = getDemoComparisonFallback(SAMPLE_AGREEMENT_A, SAMPLE_AGREEMENT_B, 'en');
assert(demoComp.comparison_summary != null, 'Comparison exposes structured summary');

// ── TEST SUMMARY ──────────────────────────────────────────────────
console.log('\n============================================================');
console.log(`CLIENT TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
}
