const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT: process.env.PORT || 3001,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  GEMINI_FAST_MODEL: process.env.GEMINI_FAST_MODEL || 'gemini-3.6-flash',
  GEMINI_REASONING_MODEL: process.env.GEMINI_REASONING_MODEL || 'gemini-3.6-flash',
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  DEMO_MODE: process.env.DEMO_MODE !== undefined ? process.env.DEMO_MODE === 'true' : true,
  GEMINI_TIMEOUT_MS: 60000,
  GEMINI_MAX_RETRIES: 2,
  CACHE_TTL_SECONDS: 3600,
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5 MB
  RATE_LIMIT_WINDOW_MS: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 30,
  MAX_TOOL_CALLS: 5,
  MAX_AGENT_STEPS: 5,
  MAX_EXECUTION_TIME_MS: 60000,
};

// Validate required config on startup
function validateConfig() {
  if (!config.GEMINI_API_KEY) {
    if (config.DEMO_MODE) {
      config.GEMINI_API_KEY = 'demo_mode_key_active';
      return;
    }
    console.error('FATAL: GEMINI_API_KEY is not set. Copy .env.example to .env and add your key.');
    process.exit(1);
  }
}

module.exports = { config, validateConfig };
