const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

function getDevilsAdvocateSystemPrompt(documentText, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';

  return `You are LegalLens AI Devil's Advocate Engine.
Your role is to demystify complex contract clauses by presenting multi-perspective reasoning:
1. COUNTERPARTY PERSPECTIVE: Explain why the other party (e.g. landlord, employer, service provider) included this clause, their legitimate business risks, and what they are trying to protect against.
2. SIGNER PERSPECTIVE: Explain how this clause puts the signing party at risk, where the imbalance lies, and worst-case liabilities.
3. BALANCED COMPROMISE: Propose an equitable middle-ground revision that protects the counterparty's valid concerns without exposing the signer to unfair risk.

CRITICAL RULES:
- Ground facts strictly in the provided document text.
- Do not make legal advice assertions.
- Write in ${langName}.

DOCUMENT TEXT:
---
${documentText}
---`;
}

function getDevilsAdvocateUserPrompt(clause) {
  return `Analyze this clause from multi-perspectives:

CLAUSE ${clause.clause_number} (${clause.category}):
"${clause.clause_text}"
CONCERN: "${clause.risk_reason || clause.explanation || ''}"

Provide:
1. Counterparty Perspective (rational justification from their view)
2. Signer Perspective (risks, traps, asymmetry)
3. Balanced Compromise (fair clause text and explanation)
4. WHAT, WHY, WHERE, WHAT NEXT`;
}

function getDevilsAdvocateSchema() {
  return {
    type: 'OBJECT',
    properties: {
      clause_number: { type: 'NUMBER' },
      what: { type: 'STRING' },
      why: { type: 'STRING' },
      where: { type: 'STRING' },
      what_next: { type: 'STRING' },
      counterparty_perspective: {
        type: 'OBJECT',
        properties: {
          role: { type: 'STRING' },
          legitimate_goal: { type: 'STRING' },
          business_risk_prevented: { type: 'STRING' },
          explanation: { type: 'STRING' },
        },
        required: ['role', 'legitimate_goal', 'business_risk_prevented', 'explanation'],
      },
      signer_perspective: {
        type: 'OBJECT',
        properties: {
          role: { type: 'STRING' },
          main_vulnerability: { type: 'STRING' },
          potential_hardship: { type: 'STRING' },
          explanation: { type: 'STRING' },
        },
        required: ['role', 'main_vulnerability', 'potential_hardship', 'explanation'],
      },
      balanced_compromise: {
        type: 'OBJECT',
        properties: {
          compromise_clause_text: { type: 'STRING' },
          why_fair_to_both: { type: 'STRING' },
        },
        required: ['compromise_clause_text', 'why_fair_to_both'],
      },
    },
    required: ['clause_number', 'what', 'why', 'where', 'what_next', 'counterparty_perspective', 'signer_perspective', 'balanced_compromise'],
  };
}

module.exports = {
  getDevilsAdvocateSystemPrompt,
  getDevilsAdvocateUserPrompt,
  getDevilsAdvocateSchema,
};
