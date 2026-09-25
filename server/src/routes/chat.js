const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middleware/rateLimiter');
const { chatWithDocument, draftMessage } = require('../services/gemini');

// POST /api/chat
// Body: { documentText, question, history, language }
router.post('/', apiLimiter, express.json({ limit: '1mb' }), async (req, res, next) => {
  try {
    const { documentText, question, history, language } = req.body;

    // Validate required fields
    if (!documentText || typeof documentText !== 'string' || documentText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Document text is required for chat. Please analyze a document first.',
        code: 'NO_DOCUMENT',
      });
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a question about the document.',
        code: 'NO_QUESTION',
      });
    }

    if (question.trim().length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Question is too long. Please keep it under 2000 characters.',
        code: 'QUESTION_TOO_LONG',
      });
    }

    // Validate and sanitize history
    const validLang = ['en', 'hi', 'kn'].includes(language) ? language : 'en';
    const validHistory = Array.isArray(history)
      ? history.slice(-10).map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: typeof msg.content === 'string' ? msg.content.slice(0, 5000) : '',
        }))
      : [];

    const result = await chatWithDocument(
      documentText,
      question.trim(),
      validHistory,
      validLang
    );

    console.log(`[${new Date().toISOString()}] Chat response: found=${result.found_in_document}, sources=${result.source_clauses?.length || 0}`);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/chat/draft
// Body: { documentText, clause, language }
router.post('/draft', apiLimiter, express.json({ limit: '1mb' }), async (req, res, next) => {
  try {
    const { documentText, clause, language } = req.body;

    if (!documentText || typeof documentText !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Document text is required.',
        code: 'NO_DOCUMENT',
      });
    }

    if (!clause || !clause.clause_text) {
      return res.status(400).json({
        success: false,
        error: 'Clause information is required.',
        code: 'NO_CLAUSE',
      });
    }

    const validLang = ['en', 'hi', 'kn'].includes(language) ? language : 'en';

    const result = await draftMessage(documentText, clause, validLang);

    console.log(`[${new Date().toISOString()}] Draft message generated for clause ${clause.clause_number}`);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
