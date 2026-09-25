const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const { negotiateClause, devilsAdvocateClause } = require('../services/gemini');
const { getCached, setCached, generateCacheKey } = require('../services/cache');
const { config } = require('../config');

// POST /api/negotiate
router.post('/', apiLimiter, async (req, res, next) => {
  try {
    const {
      documentText,
      clause,
      role = 'tenant',
      tone = 'professional',
      goal = 'balanced',
      language = 'en',
    } = req.body;

    if (!documentText || !clause) {
      return res.status(400).json({
        success: false,
        error: 'Document text and clause details are required for negotiation copilot.',
        code: 'INVALID_INPUT',
      });
    }

    const cacheKey = generateCacheKey(
      `negotiate:${clause.clause_number}:${role}:${tone}:${goal}`,
      language,
      config.GEMINI_MODEL
    );
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ success: true, data: { ...cached, fromCache: true } });
    }

    const result = await negotiateClause(documentText, clause, role, tone, goal, language);
    setCached(cacheKey, result);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/negotiate/devils-advocate
router.post('/devils-advocate', apiLimiter, async (req, res, next) => {
  try {
    const { documentText, clause, language = 'en' } = req.body;

    if (!documentText || !clause) {
      return res.status(400).json({
        success: false,
        error: 'Document text and clause are required for Devil\'s Advocate analysis.',
        code: 'INVALID_INPUT',
      });
    }

    const cacheKey = generateCacheKey(
      `devilsadvocate:${clause.clause_number}:${clause.clause_text?.substring(0, 50)}`,
      language,
      config.GEMINI_MODEL
    );
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ success: true, data: { ...cached, fromCache: true } });
    }

    const result = await devilsAdvocateClause(documentText, clause, language);
    setCached(cacheKey, result);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
