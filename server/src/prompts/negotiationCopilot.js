const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

function getNegotiationCopilotSystemPrompt(documentText, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';

  return `You are LegalLens AI Negotiation Copilot. Your role is to help signers negotiate fair, balanced agreements by proposing professional counter-clauses, compromise positions, and structured communication drafts.

CRITICAL RULES:
1. GROUND TRUTH: Base all reasoning on the actual document text provided.
2. OBJECTIVITY: Do NOT claim terms are illegal. Frame changes around mutual protection, reasonable commercial practice, and risk balance.
3. STRUCTURED CONCLUSIONS: Provide WHAT, WHY, WHERE, WHAT NEXT for each recommendation.
4. ROLE AWARENESS: Support negotiation for either Tenant vs Landlord, Employee vs Employer, or Vendor vs Client.
5. LANGUAGE: Provide all rationale, talking points, and messages in ${langName}. Preserve technical legal terminology where needed.

DOCUMENT TEXT:
---
${documentText}
---`;
}

function getNegotiationCopilotUserPrompt(clause, role = 'tenant', tone = 'professional', goal = 'balanced') {
  return `Help negotiate the following clause from the agreement:

CLAUSE NUMBER: ${clause.clause_number}
CATEGORY: ${clause.category}
ORIGINAL TEXT: "${clause.clause_text}"
CURRENT CONCERN: "${clause.risk_reason || clause.explanation || ''}"

USER ROLE: ${role}
DESIRED TONE: ${tone} (e.g., firm_professional, collaborative_polite, strict_compliance)
GOAL: ${goal} (e.g., reduce penalty, add mutual notice, cap liability, remove unannounced entry)

Generate a complete negotiation toolkit:
1. WHAT / WHY / WHERE / WHAT NEXT summary
2. Proposed Redline Replacement Clause
3. Fallback Compromise Position
4. Strategic Talking Points (3 bullet points)
5. Ready-to-send Formal Email / Letter Draft`;
}

function getNegotiationCopilotSchema() {
  return {
    type: 'OBJECT',
    properties: {
      what: { type: 'STRING', description: 'Core issue with the clause' },
      why: { type: 'STRING', description: 'Why this clause is currently problematic or one-sided' },
      where: { type: 'STRING', description: 'Clause number and section reference' },
      what_next: { type: 'STRING', description: 'First actionable step the user should take' },
      counter_proposal: {
        type: 'STRING',
        description: 'Exact redline replacement clause with balanced wording suitable for insertion into the contract',
      },
      changes_made_summary: {
        type: 'STRING',
        description: 'Brief explanation of what was changed and why it is fairer',
      },
      fallback_position: {
        type: 'STRING',
        description: 'Secondary compromise position if the counterparty rejects the initial proposal',
      },
      talking_points: {
        type: 'ARRAY',
        items: { type: 'STRING' },
        description: '3 concise, persuasive talking points to use during verbal discussions',
      },
      formal_draft: {
        type: 'OBJECT',
        properties: {
          subject: { type: 'STRING' },
          body: { type: 'STRING' },
        },
        required: ['subject', 'body'],
      },
    },
    required: [
      'what', 'why', 'where', 'what_next',
      'counter_proposal', 'changes_made_summary',
      'fallback_position', 'talking_points', 'formal_draft'
    ],
  };
}

module.exports = {
  getNegotiationCopilotSystemPrompt,
  getNegotiationCopilotUserPrompt,
  getNegotiationCopilotSchema,
};
