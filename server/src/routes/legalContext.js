const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const { verifyLegalContext } = require('../services/gemini');
const { getCached, setCached, generateCacheKey } = require('../services/cache');
const { config } = require('../config');

// POST /api/verify-context
router.post('/', apiLimiter, async (req, res, next) => {
  try {
    const {
      documentText,
      clauseNumber,
      clauseText,
      jurisdiction = 'General / India',
      language = 'en',
    } = req.body;

    if (!documentText || !clauseText) {
      return res.status(400).json({
        success: false,
        error: 'Document text and clause text are required for legal context verification.',
        code: 'INVALID_INPUT',
      });
    }

    const cacheKey = generateCacheKey(
      `legalcontext:${clauseNumber}:${jurisdiction}:${clauseText.substring(0, 80)}`,
      language,
      config.GEMINI_MODEL
    );
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ success: true, data: { ...cached, fromCache: true } });
    }

    const result = await verifyLegalContext(
      documentText,
      clauseNumber,
      clauseText,
      jurisdiction,
      language
    );
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
