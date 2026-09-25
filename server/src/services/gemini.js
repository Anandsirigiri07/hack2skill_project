const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('../config');
const {
  getClauseBreakdownSystemPrompt,
  getClauseBreakdownUserPrompt,
  getClauseBreakdownSchema,
} = require('../prompts/clauseBreakdown');
const {
  getChatSystemPrompt,
  getChatResponseSchema,
} = require('../prompts/chatQA');
const {
  getContractComparisonSystemPrompt,
  getContractComparisonUserPrompt,
  getContractComparisonSchema,
} = require('../prompts/contractComparison');

let genAI = null;

function getClient() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
  }
  return genAI;
}

const {
  getDemoAnalysisFallback,
  getDemoStressTestFallback,
  getDemoNegotiationFallback,
  getDemoLegalContextFallback,
  getDemoChatFallback,
  getDemoComparisonFallback,
  getDemoDevilsAdvocateFallback,
  getDemoDraftFallback,
} = require('./demoFallback');

/**
 * Checks if error should fall back to grounded demo data.
 */
function isEligibleForDemoFallback(err) {
  if (!config.DEMO_MODE) return false;
  return true;
}

/**
 * Analyze a document and return structured clause breakdown.
 * Uses structured JSON output mode for reliable parsing.
 */
async function analyzeDocument(documentText, language = 'en') {
  try {
    const client = getClient();

    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getClauseBreakdownSystemPrompt(language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getClauseBreakdownSchema(),
        temperature: 0.2,
        maxOutputTokens: 8192,
      },
    });

    const userPrompt = getClauseBreakdownUserPrompt(documentText);

    const result = await withRetry(async () => {
      return await withTimeout(
        model.generateContent(userPrompt),
        config.GEMINI_TIMEOUT_MS
      );
    }, config.GEMINI_MAX_RETRIES);

    const responseText = result.response.text();
    const parsed = parseAndValidateJSON(responseText, 'clause analysis');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded demo analysis.`);
      return getDemoAnalysisFallback(documentText, language);
    }
    throw err;
  }
}

/**
 * Chat with the document — grounded Q&A.
 * Returns structured JSON with answer + source clause references.
 */
async function chatWithDocument(documentText, question, history = [], language = 'en') {
  try {
    const client = getClient();

    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getChatSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getChatResponseSchema(),
        temperature: 0.4,
        maxOutputTokens: 4096,
      },
    });

    // Convert history to Gemini format
    const geminiHistory = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history: geminiHistory });

    const result = await withRetry(async () => {
      return await withTimeout(
        chat.sendMessage(question),
        config.GEMINI_TIMEOUT_MS
      );
    }, config.GEMINI_MAX_RETRIES);

    const responseText = result.response.text();
    const parsed = parseAndValidateJSON(responseText, 'chat response');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded chat demo fallback.`);
      return getDemoChatFallback(documentText, question, language);
    }
    throw err;
  }
}

/**
 * Draft a negotiation message for a specific clause.
 * Reuses the chat infrastructure with a specialized prompt.
 */
async function draftMessage(documentText, clauseInfo, language = 'en') {
  try {
    const { getDraftMessagePrompt } = require('../prompts/negotiation');
    const client = getClient();

    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getChatSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getChatResponseSchema(),
        temperature: 0.5,
        maxOutputTokens: 2048,
      },
    });

    const prompt = getDraftMessagePrompt(clauseInfo, language);

    const result = await withRetry(async () => {
      return await withTimeout(
        model.generateContent(prompt),
        config.GEMINI_TIMEOUT_MS
      );
    }, config.GEMINI_MAX_RETRIES);

    const responseText = result.response.text();
    const parsed = parseAndValidateJSON(responseText, 'draft message');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded draft demo fallback.`);
      return getDemoDraftFallback(clauseInfo, language);
    }
    throw err;
  }
}

/**
 * Compare two legal documents side-by-side.
 */
async function compareDocuments(docAText, docBText, language = 'en') {
  try {
    const client = getClient();

    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getContractComparisonSystemPrompt(language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getContractComparisonSchema(),
        temperature: 0.2,
        maxOutputTokens: 8192,
      },
    });

    const userPrompt = getContractComparisonUserPrompt(docAText, docBText);

    const result = await withRetry(async () => {
      return await withTimeout(
        model.generateContent(userPrompt),
        config.GEMINI_TIMEOUT_MS
      );
    }, config.GEMINI_MAX_RETRIES);

    const responseText = result.response.text();
    const parsed = parseAndValidateJSON(responseText, 'contract comparison');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded comparison demo fallback.`);
      return getDemoComparisonFallback(docAText, docBText, language);
    }
    throw err;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Wrap a promise with a timeout.
 */
function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Gemini API timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Retry with exponential backoff on transient failures.
 */
async function withRetry(fn, maxRetries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const isTransient =
        err.message?.includes('timeout') ||
        err.message?.includes('503') ||
        err.message?.includes('429') ||
        err.message?.includes('UNAVAILABLE') ||
        err.message?.includes('RESOURCE_EXHAUSTED') ||
        err.message?.includes('fetch failed');

      if (!isTransient || attempt === maxRetries) {
        throw err;
      }

      const delayMs = Math.pow(2, attempt) * 1000; // 1s, 2s
      console.log(
        `[${new Date().toISOString()}] Gemini retry ${attempt + 1}/${maxRetries} after ${delayMs}ms`
      );
      await sleep(delayMs);
    }
  }
  throw lastError;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse and validate JSON response from Gemini.
 * Throws a clear error if the response isn't valid JSON.
 */
function parseAndValidateJSON(text, context) {
  try {
    if (!text || typeof text !== 'string') {
      throw new Error('Empty response from AI');
    }

    let cleanText = text.trim();

    // Strip markdown fences
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }

    // Extract outer JSON object or array if extra conversational text is present
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleanText);
    return parsed;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Malformed Gemini JSON for ${context}:`, {
      textLength: text?.length,
      firstChars: text?.substring(0, 120),
      error: err.message,
    });
    throw new Error(
      `AI returned an unexpected response format. Please try again.`
    );
  }
}

const {
  getStressTestSystemPrompt,
  getStressTestUserPrompt,
  getStressTestSchema,
} = require('../prompts/stressTest');
const {
  getNegotiationCopilotSystemPrompt,
  getNegotiationCopilotUserPrompt,
  getNegotiationCopilotSchema,
} = require('../prompts/negotiationCopilot');
const {
  getLegalContextSystemPrompt,
  getLegalContextUserPrompt,
  getLegalContextSchema,
} = require('../prompts/legalContext');
const {
  getDevilsAdvocateSystemPrompt,
  getDevilsAdvocateUserPrompt,
  getDevilsAdvocateSchema,
} = require('../prompts/devilsAdvocate');

/**
 * Run a contract stress-test / what-if simulation using Gemini.
 */
async function stressTestDocument(documentText, scenario, language = 'en') {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getStressTestSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getStressTestSchema(),
        temperature: 0.2,
        maxOutputTokens: 8192,
      },
    });

    const prompt = getStressTestUserPrompt(scenario);
    const result = await withRetry(async () => {
      return await withTimeout(model.generateContent(prompt), config.GEMINI_TIMEOUT_MS);
    }, config.GEMINI_MAX_RETRIES);

    const parsed = parseAndValidateJSON(result.response.text(), 'stress test');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded stress test demo fallback.`);
      return getDemoStressTestFallback(scenario, language);
    }
    throw err;
  }
}

/**
 * Negotiation Copilot: generate counter-proposals, fallbacks, and formal drafts.
 */
async function negotiateClause(documentText, clause, role = 'tenant', tone = 'professional', goal = 'balanced', language = 'en') {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getNegotiationCopilotSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getNegotiationCopilotSchema(),
        temperature: 0.3,
        maxOutputTokens: 4096,
      },
    });

    const prompt = getNegotiationCopilotUserPrompt(clause, role, tone, goal);
    const result = await withRetry(async () => {
      return await withTimeout(model.generateContent(prompt), config.GEMINI_TIMEOUT_MS);
    }, config.GEMINI_MAX_RETRIES);

    const parsed = parseAndValidateJSON(result.response.text(), 'negotiation copilot');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded negotiation demo fallback.`);
      return getDemoNegotiationFallback(clause, language);
    }
    throw err;
  }
}

/**
 * Legal Context Verification: tri-pane breakdown (Document Fact, Statute/Benchmark, AI Interpretation).
 */
async function verifyLegalContext(documentText, clauseNumber, clauseText, jurisdiction = 'General / India', language = 'en') {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getLegalContextSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getLegalContextSchema(),
        temperature: 0.2,
        maxOutputTokens: 4096,
      },
    });

    const prompt = getLegalContextUserPrompt(clauseNumber, clauseText, jurisdiction);
    const result = await withRetry(async () => {
      return await withTimeout(model.generateContent(prompt), config.GEMINI_TIMEOUT_MS);
    }, config.GEMINI_MAX_RETRIES);

    const parsed = parseAndValidateJSON(result.response.text(), 'legal context verification');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded legal context demo fallback.`);
      return getDemoLegalContextFallback(clauseNumber, clauseText, language);
    }
    throw err;
  }
}

/**
 * Devil's Advocate: multi-perspective reasoning on a clause.
 */
async function devilsAdvocateClause(documentText, clause, language = 'en') {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: config.GEMINI_MODEL,
      systemInstruction: getDevilsAdvocateSystemPrompt(documentText, language),
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: getDevilsAdvocateSchema(),
        temperature: 0.3,
        maxOutputTokens: 4096,
      },
    });

    const prompt = getDevilsAdvocateUserPrompt(clause);
    const result = await withRetry(async () => {
      return await withTimeout(model.generateContent(prompt), config.GEMINI_TIMEOUT_MS);
    }, config.GEMINI_MAX_RETRIES);

    const parsed = parseAndValidateJSON(result.response.text(), 'devils advocate');
    return parsed;
  } catch (err) {
    if (isEligibleForDemoFallback(err)) {
      console.warn(`[DEMO MODE] Gemini API exception (${err.message}). Serving grounded devils advocate demo fallback.`);
      return getDemoDevilsAdvocateFallback(clause, language);
    }
    throw err;
  }
}

module.exports = {
  analyzeDocument,
  chatWithDocument,
  draftMessage,
  compareDocuments,
  stressTestDocument,
  negotiateClause,
  verifyLegalContext,
  devilsAdvocateClause,
};
