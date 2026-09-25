const express = require('express');
const router = express.Router();
const multer = require('multer');
const { config } = require('../config');
const { apiLimiter } = require('../middleware/rateLimiter');
const { extractText } = require('../services/documentParser');
const { compareDocuments } = require('../services/gemini');
const { getCached, setCached, generateCacheKey } = require('../services/cache');

const storage = multer.memoryStorage();
const compareUpload = multer({
  storage,
  limits: { fileSize: config.MAX_FILE_SIZE_BYTES },
});

// POST /api/compare
// Accepts: multipart (fields: 'fileA', 'fileB') OR JSON { textA, textB, language }
router.post(
  '/',
  apiLimiter,
  compareUpload.fields([
    { name: 'fileA', maxCount: 1 },
    { name: 'fileB', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      let textA = '';
      let textB = '';
      let language = req.body?.language || 'en';

      if (!['en', 'hi', 'kn'].includes(language)) {
        language = 'en';
      }

      // Handle Document A
      if (req.files?.fileA?.[0]) {
        const fA = req.files.fileA[0];
        const parsedA = await extractText(fA.buffer, fA.mimetype, fA.originalname);
        textA = parsedA.text;
      } else if (req.body?.textA && typeof req.body.textA === 'string') {
        textA = req.body.textA.trim();
      }

      // Handle Document B
      if (req.files?.fileB?.[0]) {
        const fB = req.files.fileB[0];
        const parsedB = await extractText(fB.buffer, fB.mimetype, fB.originalname);
        textB = parsedB.text;
      } else if (req.body?.textB && typeof req.body.textB === 'string') {
        textB = req.body.textB.trim();
      }

      // Validation
      if (!textA || textA.length < 50) {
        return res.status(400).json({
          success: false,
          error: 'Document A is missing or too short to compare (minimum 50 characters).',
          code: 'INVALID_DOC_A',
        });
      }

      if (!textB || textB.length < 50) {
        return res.status(400).json({
          success: false,
          error: 'Document B is missing or too short to compare (minimum 50 characters).',
          code: 'INVALID_DOC_B',
        });
      }

      // Check Cache
      const cacheKey = generateCacheKey(`compare_${textA}_${textB}`, language);
      const cached = getCached(cacheKey);
      if (cached) {
        console.log(`[${new Date().toISOString()}] Cache HIT for comparison`);
        return res.json({
          success: true,
          data: { ...cached, fromCache: true },
        });
      }

      console.log(`[${new Date().toISOString()}] Calling Gemini for Document Comparison (lang=${language})`);
      const comparison = await compareDocuments(textA, textB, language);

      setCached(cacheKey, comparison);

      res.json({
        success: true,
        data: {
          ...comparison,
          fromCache: false,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
