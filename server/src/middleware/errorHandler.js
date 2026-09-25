function errorHandler(err, req, res, _next) {
  // Log only metadata, never full document content or API keys
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Multer file-size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: 'File is too large. Maximum size is 5 MB.',
      code: 'FILE_TOO_LARGE',
    });
  }

  // Multer file-type error
  if (err.message && err.message.includes('Unsupported file type')) {
    return res.status(400).json({
      success: false,
      error: err.message,
      code: 'INVALID_FILE_TYPE',
    });
  }

  // Gemini timeout
  if (err.message && err.message.includes('timeout')) {
    return res.status(504).json({
      success: false,
      error: 'The AI analysis took too long. Please try again with a shorter document.',
      code: 'AI_TIMEOUT',
    });
  }

  // Gemini API error
  if (err.message && (err.message.includes('Gemini') || err.message.includes('GoogleGenerativeAI'))) {
    return res.status(502).json({
      success: false,
      error: 'AI service is temporarily unavailable. Please try again in a moment.',
      code: 'AI_UNAVAILABLE',
    });
  }

  // Default server error — never expose internals
  res.status(err.status || 500).json({
    success: false,
    error: err.expose ? err.message : 'Something went wrong. Please try again.',
    code: 'SERVER_ERROR',
  });
}

module.exports = { errorHandler };
