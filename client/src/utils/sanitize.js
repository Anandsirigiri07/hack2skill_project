import DOMPurify from 'dompurify';

/**
 * Sanitize a string for safe rendering in the UI.
 * Strips all HTML tags by default to prevent XSS.
 */
export function sanitize(text) {
  if (typeof text !== 'string') return '';
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Sanitize text but allow basic formatting tags.
 */
export function sanitizeWithFormatting(text) {
  if (typeof text !== 'string') return '';
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
  });
}
