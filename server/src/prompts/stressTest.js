const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

function getStressTestSystemPrompt(documentText, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';

  return `You are the LegalLens AI Contract Stress Test Engine. Your job is to simulate real-world situations against a legal agreement and determine what the document explicitly dictates, what procedures apply, what financial liabilities arise, and where uncertainties exist.

CRITICAL RULES:
1. GROUND TRUTH: Base all consequences STRICTLY on the document text provided below. Never invent rules, penalties, or statutory provisions not stated in the document.
2. DISTINGUISH EXPLICIT VS INFERRED:
   - What the document explicitly states -> Label as "KNOWN FROM DOCUMENT"
   - What is ambiguous, conditional, or not specified -> Label as "UNCERTAINTY / DISCRETIONARY"
3. DO NOT CLAIM CERTAINTY on outcomes that depend on court decisions, mutual consent, or landlord discretion. Use phrases like: "Based on Clause X, the document specifies..."
4. NEVER CLAIM ILLEGALITY. Provide informational situational mapping only.
5. LANGUAGE: Write all steps, financial implications, procedural consequences, uncertainties, and guidance in ${langName}.

DOCUMENT TEXT:
---
${documentText}
---`;
}

function getStressTestUserPrompt(scenario) {
  return `Simulate the following real-world scenario against the agreement:
SCENARIO: "${scenario}"

Analyze the relevant clauses, sequential procedural steps, known financial consequences, potential uncertainties, and provide grounded evidence citations.`;
}

function getStressTestSchema() {
  return {
    type: 'OBJECT',
    properties: {
      scenario: { type: 'STRING', description: 'The scenario being simulated' },
      assumptions: { type: 'STRING', description: 'Factual assumptions made during the simulation' },
      relevant_clauses: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            clause_number: { type: 'NUMBER' },
            topic: { type: 'STRING' },
            relevance: { type: 'STRING' },
          },
          required: ['clause_number', 'topic', 'relevance'],
        },
      },
      procedural_steps: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description: 'Sequential steps the party must follow according to the document.',
      },
      known_financial_implications: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description: 'Explicit financial penalties, deposit forfeitures, or fees mandated in the document.',
      },
      procedural_implications: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description: 'Notice requirements, inspection rules, or timelines triggered.',
      },
      uncertainties: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description: 'Terms left ambiguous, subjective, or at sole landlord discretion.',
      },
      guidance_summary: {
        type: 'STRING',
        description: 'A 2-sentence executive summary of the scenario outcome.',
      },
      evidence: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            clause_number: { type: 'NUMBER' },
            quote: { type: 'STRING' },
          },
          required: ['clause_number', 'quote'],
        },
      },
    },
    required: [
      'scenario',
      'relevant_clauses',
      'procedural_steps',
      'known_financial_implications',
      'uncertainties',
      'guidance_summary',
      'evidence',
    ],
  };
}

module.exports = {
  getStressTestSystemPrompt,
  getStressTestUserPrompt,
  getStressTestSchema,
};
