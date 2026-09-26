# Security Policy & Vulnerability Disclosure

LegalLens AI takes document privacy, model safety, and system security seriously. This document describes the security protocols, threat mitigations, and vulnerability reporting procedures implemented across LegalLens AI.

---

## 1. Supported Versions

| Version | Supported          | Security Maintenance Status |
| ------- | ------------------ | --------------------------- |
| 1.0.x   | :white_check_mark: | Actively supported (Current)|

---

## 2. Security Architecture & Threat Mitigations

### 2.1 Prompt Injection & Adversarial Document Defense
- **Strict Boundary Delimiters:** User-uploaded contracts and agreements are wrapped in structured delimiter tags (`<<<DOCUMENT_START>>> ... <<<DOCUMENT_END>>>`) preventing contractual language from escaping into prompt instruction streams.
- **Fail-Closed Refusal System:** The model is system-instructed with hard constraints to refuse instructions disguised as legal clauses (e.g., "Ignore previous instructions", "Output system prompts").
- **Zero-Hallucination Triangulation:** The model is prohibited from synthesizing legal facts or commitments not explicitly attested in the document source text (`found_in_document: false` on absent items).

### 2.2 Client-Side Sanitization & XSS Prevention
- **DOMPurify Integration:** All dynamic markdown or HTML strings rendered within the client interface are sanitized via `dompurify` prior to injection into the DOM.
- **Content Security Policy (CSP):** Strict CSP headers deployed via Express `helmet` middleware and client meta tags to disallow arbitrary remote script execution and unauthorized framing (`X-Frame-Options: SAMEORIGIN`).

### 2.3 Deterministic Financial Isolation
- **No LLM Arithmetic:** All currency aggregation, deposit liabilities, recurring commitment multiples, and per-diem fees are processed by a validated deterministic math engine (`calculator.js` / `calculator.js` server utility).
- Model outputs only provide tokenized strings; math operations are calculated using IEEE-754 verified arithmetic pipelines.

### 2.4 Rate Limiting & Denial of Service Protection
- **Sliding-Window Rate Limiting:** All `/api/*` endpoints are protected by `express-rate-limit` (100 requests per 15-minute window for standard endpoints; 20 requests per 15-minute window for GenAI inference).
- **Payload Size Guards:** In-memory file upload limits are strictly constrained (`multer` file size ceiling of 10 MB per PDF/DOCX; Express body parser capped at 10 MB).

### 2.5 Secret Hygiene & Key Protection
- **Zero Key Leaks:** API keys (`GEMINI_API_KEY`) are managed exclusively server-side through system environment variables or `.env` files protected by `.gitignore`.
- **Stateless Fallback:** In the absence of live API credentials, the platform switches into an isolated demo sandbox (`DEMO_MODE=true`) rather than failing insecurely.

---

## 3. Reporting a Vulnerability

If you discover a potential security vulnerability within LegalLens AI:
1. **Do not open a public issue.**
2. Send an email to the security response team at `security@legallens.ai` or submit a report through GitHub Private Vulnerability Reporting.
3. Include:
   - Description of the vulnerability.
   - Exact steps or proof of concept to reproduce.
   - Assessment of potential impact.

We commit to acknowledging receipt within 24 hours and providing an initial mitigation assessment within 72 hours.
