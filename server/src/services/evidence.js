/**
 * Evidence service — maps clause references without inventing data.
 * Only uses information actually present in the parsed document.
 */

/**
 * Build an evidence map from parsed clause analysis.
 * Maps clause numbers to their text for cross-referencing in chat.
 */
function buildEvidenceMap(clauses) {
  const map = {};
  if (!Array.isArray(clauses)) return map;

  for (const clause of clauses) {
    if (clause.clause_number != null) {
      map[clause.clause_number] = {
        clause_number: clause.clause_number,
        category: clause.category || 'other',
        clause_text: clause.clause_text || '',
        plain_summary: clause.plain_summary || '',
      };
    }
  }
  return map;
}

/**
 * Find the best matching clause for a given text snippet.
 * Used to cross-reference chat answers back to clauses.
 */
function findMatchingClause(snippet, clauses) {
  if (!snippet || !Array.isArray(clauses)) return null;

  const normalizedSnippet = snippet.toLowerCase().replace(/\s+/g, ' ').trim();

  // Try exact substring match first
  for (const clause of clauses) {
    const normalizedClause = (clause.clause_text || '').toLowerCase().replace(/\s+/g, ' ');
    if (normalizedClause.includes(normalizedSnippet) || normalizedSnippet.includes(normalizedClause)) {
      return clause.clause_number;
    }
  }

  // Try significant word overlap
  const snippetWords = new Set(normalizedSnippet.split(' ').filter(w => w.length > 3));
  let bestMatch = null;
  let bestOverlap = 0;

  for (const clause of clauses) {
    const clauseWords = new Set(
      (clause.clause_text || '').toLowerCase().split(/\s+/).filter(w => w.length > 3)
    );
    const overlap = [...snippetWords].filter(w => clauseWords.has(w)).length;
    if (overlap > bestOverlap && overlap >= 3) {
      bestOverlap = overlap;
      bestMatch = clause.clause_number;
    }
  }

  return bestMatch;
}

module.exports = { buildEvidenceMap, findMatchingClause };
