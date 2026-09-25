const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

function getLegalContextSystemPrompt(documentText, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';

  return `You are LegalLens AI Legal Context Verification Engine.
Your task is to provide informational legal context by strictly distinguishing three separate layers:
1. DOCUMENT FACT: Verbatim clauses and obligations stated directly in the document.
2. EXTERNAL INFORMATION / STATUTE: Relevant statutory principles, model codes, or customary industry benchmarks (e.g. Model Tenancy Act guidelines on security deposit limits, statutory notice periods, Transfer of Property Act Sec 108, Indian Contract Act 1872).
3. AI INTERPRETATION: Objective comparison of how the document terms align with or diverge from customary or balanced practices.

CRITICAL INSTRUCTIONS:
- Ground all document facts directly in the provided text.
- Do NOT provide legal advice. Always maintain that local state/jurisdiction laws prevail and independent advocate review is recommended for formal disputes.
- Provide explicit WHAT, WHY, WHERE, WHAT NEXT conclusions.
- Respond in ${langName}.

DOCUMENT TEXT:
---
${documentText}
---`;
}

function getLegalContextUserPrompt(clauseNumber, clauseText, jurisdiction = 'India / General') {
  return `Verify the legal context for this clause:

CLAUSE NUMBER: ${clauseNumber}
CLAUSE TEXT: "${clauseText}"
JURISDICTION / REGION: ${jurisdiction}

Separate the analysis into:
1. DOCUMENT FACT (what the contract actually says)
2. EXTERNAL INFORMATION (relevant statutes or standard benchmarks)
3. AI INTERPRETATION (practical risk, balance, and customary comparison)
4. WHAT, WHY, WHERE, WHAT NEXT structured breakdown`;
}

function getLegalContextSchema() {
  return {
    type: 'OBJECT',
    properties: {
      clause_number: { type: 'NUMBER' },
      what: { type: 'STRING', description: 'What this clause establishes or obligates' },
      why: { type: 'STRING', description: 'Why this provision is significant or deserves scrutiny' },
      where: { type: 'STRING', description: 'Location in document (e.g., Clause 8)' },
      what_next: { type: 'STRING', description: 'Practical recommendation or clarifying action' },
      document_fact: {
        type: 'OBJECT',
        properties: {
          verbatim_excerpt: { type: 'STRING' },
          stated_obligation: { type: 'STRING' },
          disclosed_penalties: { type: 'STRING' },
        },
        required: ['verbatim_excerpt', 'stated_obligation'],
      },
      external_information: {
        type: 'OBJECT',
        properties: {
          applicable_act_or_benchmark: { type: 'STRING' },
          statutory_or_customary_standard: { type: 'STRING' },
          benchmark_comparison: { type: 'STRING' },
          jurisdiction_note: { type: 'STRING' },
        },
        required: ['applicable_act_or_benchmark', 'statutory_or_customary_standard', 'benchmark_comparison'],
      },
      ai_interpretation: {
        type: 'OBJECT',
        properties: {
          balance_assessment: { type: 'STRING' },
          key_risk_factor: { type: 'STRING' },
          practical_guidance: { type: 'STRING' },
        },
        required: ['balance_assessment', 'key_risk_factor', 'practical_guidance'],
      },
    },
    required: ['clause_number', 'what', 'why', 'where', 'what_next', 'document_fact', 'external_information', 'ai_interpretation'],
  };
}

module.exports = {
  getLegalContextSystemPrompt,
  getLegalContextUserPrompt,
  getLegalContextSchema,
};
