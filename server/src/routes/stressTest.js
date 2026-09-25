const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const { stressTestDocument } = require('../services/gemini');
const { calculateFinancialExposure } = require('../utils/calculator');
const { getCached, setCached, generateCacheKey } = require('../services/cache');
const { config } = require('../config');

// POST /api/stress-test
router.post('/', apiLimiter, async (req, res, next) => {
  try {
    const { documentText, scenario, language = 'en', keyFacts = {} } = req.body;

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Valid document text is required for stress test simulation.',
        code: 'INVALID_DOCUMENT',
      });
    }

    if (!scenario || typeof scenario !== 'string' || scenario.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please describe or select a scenario to stress test.',
        code: 'INVALID_SCENARIO',
      });
    }

    // Check cache
    const cacheKey = generateCacheKey(
      `stresstest:${scenario.trim()}:${documentText.substring(0, 500)}`,
      language,
      config.GEMINI_MODEL
    );
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json({ success: true, data: { ...cached, fromCache: true } });
    }

    // Run AI simulation
    const simulationResult = await stressTestDocument(documentText, scenario, language);

    // Compute deterministic exposure based on extracted key facts
    const financialExposure = calculateFinancialExposure(keyFacts);

    const payload = {
      ...simulationResult,
      deterministic_exposure: financialExposure,
      simulated_at: new Date().toISOString(),
    };

    setCached(cacheKey, payload);

    res.json({
      success: true,
      data: payload,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
