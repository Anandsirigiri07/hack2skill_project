const NodeCache = require('node-cache');
const crypto = require('crypto');

const cache = new NodeCache({
  stdTTL: 3600, // 1 hour
  checkperiod: 120, // Check for expired keys every 2 minutes
  useClones: true,
  maxKeys: 100, // Limit memory usage
});

/**
 * Generate a cache key from document text + language + model.
 * Uses SHA-256 hash of the normalized text.
 */
function generateCacheKey(documentText, language, model) {
  const normalized = documentText.replace(/\s+/g, ' ').trim().toLowerCase();
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  return `analysis:${hash}:${language}:${model}`;
}

/**
 * Get cached analysis result. Returns null on cache miss or error.
 */
function getCachedAnalysis(documentText, language, model) {
  try {
    const key = generateCacheKey(documentText, language, model);
    const result = cache.get(key);
    return result || null;
  } catch (err) {
    // Cache failures are non-fatal
    console.warn('Cache read failed:', err.message);
    return null;
  }
}

/**
 * Store analysis result in cache. Silently ignores errors.
 */
function setCachedAnalysis(documentText, language, model, result) {
  try {
    const key = generateCacheKey(documentText, language, model);
    cache.set(key, result);
  } catch (err) {
    console.warn('Cache write failed:', err.message);
  }
}

function getCached(key) {
  try {
    return cache.get(key) || null;
  } catch (err) {
    return null;
  }
}

function setCached(key, value, ttl = 3600) {
  try {
    cache.set(key, value, ttl);
  } catch (err) {
    console.warn('Cache write failed:', err.message);
  }
}

function getCacheStats() {
  return cache.getStats();
}

module.exports = {
  getCachedAnalysis,
  setCachedAnalysis,
  getCached,
  setCached,
  generateCacheKey,
  getCacheStats,
};
