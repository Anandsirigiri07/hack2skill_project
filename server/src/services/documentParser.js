const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

/**
 * Extract text from an uploaded file buffer.
 * Returns { text, numPages } where numPages is null for non-PDF files.
 */
async function extractText(buffer, mimetype, filename) {
  if (!buffer || buffer.length === 0) {
    throw createError('The uploaded file appears to be empty.', 'EMPTY_FILE');
  }

  if (!ALLOWED_MIMETYPES.includes(mimetype)) {
    throw createError(
      'Unsupported file type. Please upload a PDF, DOCX, or TXT file.',
      'INVALID_FILE_TYPE'
    );
  }

  let text = '';
  let numPages = null;

  if (mimetype === 'application/pdf') {
    const result = await parsePdf(buffer);
    text = result.text;
    numPages = result.numPages;
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await parseDocx(buffer);
  } else {
    text = buffer.toString('utf-8');
  }

  // Normalize whitespace while preserving structure
  text = normalizeText(text);

  if (!text || text.trim().length < 50) {
    throw createError(
      'Could not extract meaningful text from this document. Please try pasting the text directly.',
      'NO_TEXT_EXTRACTED'
    );
  }

  return { text, numPages };
}

/**
 * Parse PDF buffer. Attempts per-page extraction.
 */
async function parsePdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return {
      text: data.text,
      numPages: data.numpages || null,
    };
  } catch (err) {
    throw createError(
      'Failed to read this PDF. The file may be corrupted or password-protected.',
      'PDF_PARSE_ERROR'
    );
  }
}

/**
 * Parse DOCX buffer using mammoth.
 */
async function parseDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (err) {
    throw createError(
      'Failed to read this DOCX file. The file may be corrupted.',
      'DOCX_PARSE_ERROR'
    );
  }
}

/**
 * Normalize text: collapse excessive whitespace, preserve clause numbering.
 */
function normalizeText(text) {
  return text
    .replace(/\r\n/g, '\n')         // Normalize line endings
    .replace(/\t/g, ' ')            // Tabs to spaces
    .replace(/ {2,}/g, ' ')         // Collapse multiple spaces
    .replace(/\n{3,}/g, '\n\n')     // Max 2 consecutive newlines
    .trim();
}

function createError(message, code) {
  const err = new Error(message);
  err.code = code;
  err.expose = true;
  return err;
}

module.exports = { extractText };
