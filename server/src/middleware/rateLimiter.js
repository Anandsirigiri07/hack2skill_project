const rateLimit = require('express-rate-limit');
const { config } = require('../config');

const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS || 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in local test runs
    const ip = req.ip || req.connection?.remoteAddress || '';
    return ip === '127.0.0.1' || ip === '::1' || ip.includes('127.0.0.1');
  },
  message: {
    success: false,
    error: "You're doing that a lot — please try again in a minute.",
    code: 'RATE_LIMITED',
  },
});

module.exports = { apiLimiter };
