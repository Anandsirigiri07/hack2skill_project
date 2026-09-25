const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  kn: 'Kannada (ಕನ್ನಡ)',
};

/**
 * Build the user prompt for drafting a negotiation message.
 */
function getDraftMessagePrompt(clause, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';

  return `Based on the document, please draft a polite, professional message that the tenant could send to the landlord regarding the following clause.

Clause ${clause.clause_number} (${clause.category}):
"${clause.clause_text}"

The concern is: ${clause.risk_reason}

Requirements for the drafted message:
- Be polite, professional, and constructive
- Suggest a specific, reasonable modification or request for clarification
- Do NOT claim the clause is illegal or invalid
- Frame it as a request for discussion, not a demand
- Keep it brief (3-5 sentences)
- Write in ${langName}
- This is a communication aid, not legal advice`;
}

/**
 * Build the prompt for suggesting negotiation questions.
 */
function getSuggestedQuestionsPrompt(clauses, language = 'en') {
  const langName = LANGUAGE_NAMES[language] || 'English';
  const highConcern = clauses.filter(c => c.risk_level === 'high_concern' || c.risk_level === 'needs_attention');

  const clauseSummaries = highConcern.map(c =>
    `Clause ${c.clause_number} (${c.category}): ${c.plain_summary}`
  ).join('\n');

  return `Based on these potentially concerning clauses from a rental agreement, suggest practical questions the tenant could ask before signing.

Clauses of concern:
${clauseSummaries}

Generate 3-5 practical, polite questions in ${langName}.
Focus on the most impactful issues.
These are negotiation aids, not legal advice.`;
}

module.exports = {
  getDraftMessagePrompt,
  getSuggestedQuestionsPrompt,
};
