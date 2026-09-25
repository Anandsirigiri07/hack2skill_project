const { analyzeDocument } = require('./gemini');
const { getCachedAnalysis, setCachedAnalysis } = require('./cache');
const { config } = require('../config');

/**
 * Analyze a document with caching.
 * Checks cache first (keyed by document hash + language + model).
 * On cache miss, calls Gemini and stores the result.
 */
async function analyzeWithCache(documentText, language = 'en') {
  // Check cache first
  const cached = getCachedAnalysis(documentText, language, config.GEMINI_MODEL);
  if (cached) {
    console.log(`[${new Date().toISOString()}] Cache HIT for document analysis (lang=${language})`);
    return { ...cached, fromCache: true };
  }

  console.log(`[${new Date().toISOString()}] Cache MISS — calling Gemini (lang=${language}, textLen=${documentText.length})`);

  // Call Gemini for analysis
  const result = await analyzeDocument(documentText, language);

  // Validate the result has required fields
  validateAnalysisResult(result);

  // Cache the result (non-fatal if caching fails)
  setCachedAnalysis(documentText, language, config.GEMINI_MODEL, result);

  return { ...result, fromCache: false };
}

/**
 * Validate that the analysis result has the expected structure.
 */
function validateAnalysisResult(result) {
  if (!result) {
    throw createError('AI returned an empty result. Please try again.');
  }

  if (!result.clauses || !Array.isArray(result.clauses)) {
    throw createError('AI did not return clause analysis. Please try again.');
  }

  if (result.clauses.length === 0) {
    throw createError('No clauses were found in the document. Please check the document and try again.');
  }

  if (typeof result.document_summary !== 'string') {
    result.document_summary = 'Document analysis completed.';
  }

  if (typeof result.risk_score !== 'number' || result.risk_score < 0 || result.risk_score > 100) {
    result.risk_score = 50;
  }

  if (!['low_concern', 'needs_attention', 'high_concern'].includes(result.overall_risk_level)) {
    result.overall_risk_level = 'needs_attention';
  }

  if (!Array.isArray(result.obligations)) {
    result.obligations = [];
  }

  // Validate each clause
  const validRiskLevels = ['low_concern', 'needs_attention', 'high_concern'];
  result.clauses = result.clauses.map((clause, index) => ({
    clause_number: clause.clause_number ?? index + 1,
    category: clause.category || 'other',
    clause_text: clause.clause_text || '',
    explanation: clause.explanation || '',
    plain_summary: clause.plain_summary || '',
    risk_level: validRiskLevels.includes(clause.risk_level) ? clause.risk_level : 'needs_attention',
    risk_reason: clause.risk_reason || '',
    user_impact: clause.user_impact || '',
    suggested_question: clause.suggested_question || '',
  }));

  return result;
}

function createError(message) {
  const err = new Error(message);
  err.expose = true;
  return err;
}

module.exports = { analyzeWithCache };
