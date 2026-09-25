const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { config, validateConfig } = require('./config');
const { errorHandler } = require('./middleware/errorHandler');
const analyzeRouter = require('./routes/analyze');
const chatRouter = require('./routes/chat');
const compareRouter = require('./routes/compare');
const stressTestRouter = require('./routes/stressTest');
const negotiationRouter = require('./routes/negotiation');
const legalContextRouter = require('./routes/legalContext');
const documentsRouter = require('./routes/documents');

// Validate config before starting
validateConfig();

const app = express();

// Security headers
app.use(helmet());

// CORS — allow localhost origins
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    maxAge: 86400,
  })
);

// Parse JSON bodies (for chat and reasoning endpoints)
app.use(express.json({ limit: '2mb' }));

// Root route — friendly guidance to frontend web app
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>LegalLens AI — Backend API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 2.5rem; border-radius: 1rem; border: 1px solid #334155; text-align: center; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        h1 { margin-top: 0; color: #38bdf8; font-size: 1.75rem; }
        p { color: #94a3b8; line-height: 1.6; margin: 1rem 0; }
        .badge { display: inline-block; background: #0369a1; color: #e0f2fe; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        .btn { display: inline-block; background: #2563eb; color: #ffffff; padding: 0.85rem 1.75rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 1rem; transition: background 0.2s; margin-top: 1rem; }
        .btn:hover { background: #1d4ed8; }
        .code { font-family: monospace; background: #0f172a; padding: 0.2rem 0.4rem; border-radius: 0.25rem; color: #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">⚖️ Backend API Server Online</div>
        <h1>LegalLens AI Backend</h1>
        <p>You are viewing the <strong>API server</strong> on port <span class="code">3001</span>.</p>
        <p>The interactive <strong>LegalLens AI Web Application</strong> is running on port <span class="code">5173</span>.</p>
        <a class="btn" href="http://localhost:5173">Open LegalLens AI Web App →</a>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    demo_mode: config.DEMO_MODE,
    model: config.GEMINI_MODEL,
  });
});

// Routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/chat', chatRouter);
app.use('/api/compare', compareRouter);
app.use('/api/stress-test', stressTestRouter);
app.use('/api/negotiate', negotiationRouter);
app.use('/api/verify-context', legalContextRouter);
app.use('/api/documents', documentsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found.',
    code: 'NOT_FOUND',
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║        LegalLens AI — Backend            ║
  ║                                          ║
  ║  Server:   http://localhost:${config.PORT}        ║
  ║  Model:    ${config.GEMINI_MODEL.padEnd(28)}║
  ║  CORS:     ${config.FRONTEND_ORIGIN.padEnd(28)}║
  ╚══════════════════════════════════════════╝
  `);
});

module.exports = app;
