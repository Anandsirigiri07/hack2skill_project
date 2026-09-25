const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { apiLimiter } = require('../middleware/rateLimiter');
const { extractText } = require('../services/documentParser');
const { analyzeWithCache } = require('../services/clauseAnalyzer');

// POST /api/analyze
// Accepts: multipart file upload (field: 'file') OR JSON body { text, language }
router.post('/', apiLimiter, upload.single('file'), async (req, res, next) => {
  try {
    let documentText = '';
    let language = req.body?.language || 'en';

    // Validate language
    if (!['en', 'hi', 'kn'].includes(language)) {
      language = 'en';
    }

    // Extract text from file or body
    if (req.file) {
      const parsed = await extractText(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );
      documentText = parsed.text;
    } else if (req.body?.text && typeof req.body.text === 'string') {
      documentText = req.body.text.trim();
    } else {
      return res.status(400).json({
        success: false,
        error: 'Please upload a document (PDF, DOCX, or TXT) or paste the agreement text.',
        code: 'NO_INPUT',
      });
    }

    // Validate text length
    if (documentText.length < 50) {
      return res.status(400).json({
        success: false,
        error: 'The document is too short to analyze. Please provide the full agreement text.',
        code: 'TEXT_TOO_SHORT',
      });
    }

    if (documentText.length > 100000) {
      return res.status(400).json({
        success: false,
        error: 'The document is too long. Please provide a document under 100,000 characters.',
        code: 'TEXT_TOO_LONG',
      });
    }

    // Analyze the document
    const analysis = await analyzeWithCache(documentText, language);

    // Calculate deterministic financial exposure
    const { calculateFinancialExposure } = require('../utils/calculator');
    const financialExposure = calculateFinancialExposure(analysis.key_facts || {});

    // Ensure WHAT, WHY, WHERE, WHAT NEXT on every clause
    const enrichedClauses = (analysis.clauses || []).map((c, idx) => ({
      ...c,
      what: c.what || c.plain_summary || `Clause ${c.clause_number}: ${c.category}`,
      why: c.why || c.risk_reason || c.explanation || 'Specifies terms governing parties.',
      where: c.where || `Clause ${c.clause_number}`,
      what_next: c.what_next || c.suggested_question || 'Review terms with counterparty before signing.',
    }));

    // Detect Red Flags
    const redFlags = enrichedClauses
      .filter((c) => c.risk_level === 'high_concern' || c.risk_level === 'needs_attention')
      .map((c) => ({
        clause_number: c.clause_number,
        category: c.category,
        severity: c.risk_level === 'high_concern' ? 'Critical' : 'High Caution',
        issue: c.what,
        reason: c.why,
        location: c.where,
        recommended_action: c.what_next,
        original_text: c.clause_text,
      }));

    // Derive Clause Relationships (Contract Graph)
    const clauseRelationships = buildClauseRelationships(enrichedClauses);

    // Log metadata only — never log document content
    console.log(`[${new Date().toISOString()}] Analysis complete: ${enrichedClauses.length} clauses, risk=${analysis.risk_score}, red_flags=${redFlags.length}`);

    res.json({
      success: true,
      data: {
        document_type: analysis.document_type || 'Legal Agreement',
        document_summary: analysis.document_summary,
        overall_risk_level: analysis.overall_risk_level,
        risk_score: analysis.risk_score,
        key_facts: analysis.key_facts || {},
        financial_exposure: financialExposure,
        red_flags: redFlags,
        clause_relationships: clauseRelationships,
        obligations: analysis.obligations || [],
        important_dates: analysis.important_dates || [],
        action_checklist: analysis.action_checklist || [],
        clauses: enrichedClauses,
        fromCache: analysis.fromCache,
      },
      documentText,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Deterministically constructs relationship edges between clauses
 * (e.g. payment triggers late fees, late fees trigger breach/termination, termination impacts deposit).
 */
function buildClauseRelationships(clauses = []) {
  const nodes = clauses.map((c) => ({
    id: `clause-${c.clause_number}`,
    number: c.clause_number,
    label: `Clause ${c.clause_number}`,
    category: c.category,
    risk: c.risk_level,
    summary: c.plain_summary,
  }));

  const edges = [];
  const findClause = (cat) => clauses.find((c) => c.category === cat);

  const rentClause = findClause('rent_payments');
  const depositClause = findClause('security_deposit');
  const termClause = findClause('termination');
  const penaltyClause = clauses.find((c) => c.category === 'other' || c.clause_text?.toLowerCase().includes('late fee') || c.clause_text?.toLowerCase().includes('penalty'));
  const maintClause = findClause('maintenance');
  const moveOutClause = findClause('move_out');

  if (rentClause && penaltyClause && rentClause.clause_number !== penaltyClause.clause_number) {
    edges.push({
      source: `clause-${rentClause.clause_number}`,
      target: `clause-${penaltyClause.clause_number}`,
      relationship: 'Non-payment Triggers',
      type: 'financial_liability',
    });
  }

  if (termClause && depositClause && termClause.clause_number !== depositClause.clause_number) {
    edges.push({
      source: `clause-${termClause.clause_number}`,
      target: `clause-${depositClause.clause_number}`,
      relationship: 'Early Departure Deductions',
      type: 'conditionality',
    });
  }

  if (maintClause && depositClause && maintClause.clause_number !== depositClause.clause_number) {
    edges.push({
      source: `clause-${maintClause.clause_number}`,
      target: `clause-${depositClause.clause_number}`,
      relationship: 'Damage Withholding',
      type: 'cross_impact',
    });
  }

  if (moveOutClause && depositClause && moveOutClause.clause_number !== depositClause.clause_number) {
    edges.push({
      source: `clause-${moveOutClause.clause_number}`,
      target: `clause-${depositClause.clause_number}`,
      relationship: 'Inspection & Refund Window',
      type: 'conditionality',
    });
  }

  // Generic link for sequential clauses if edges are few
  if (edges.length === 0 && clauses.length > 1) {
    for (let i = 0; i < Math.min(clauses.length - 1, 4); i++) {
      edges.push({
        source: `clause-${clauses[i].clause_number}`,
        target: `clause-${clauses[i + 1].clause_number}`,
        relationship: 'Sequential Dependency',
        type: 'governance',
      });
    }
  }

  return { nodes, edges };
}

module.exports = router;
