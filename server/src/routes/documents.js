const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// In-memory / session document store for Demo Mode
let documentsStore = [
  {
    id: 'doc-sample-a',
    title: 'Residential Tenancy Agreement (Standard Indiranagar)',
    document_type: 'Rental / Lease Agreement',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    risk_score: 72,
    risk_level: 'high_concern',
    clauses_count: 12,
    tags: ['Rental', 'Indiranagar', 'Flagged'],
    is_sample: true,
  },
  {
    id: 'doc-sample-b',
    title: 'Model Balanced Tenancy Agreement (BMRCL Compliant)',
    document_type: 'Rental / Lease Agreement',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    risk_score: 24,
    risk_level: 'low_concern',
    clauses_count: 12,
    tags: ['Rental', 'Balanced', 'Safe'],
    is_sample: true,
  }
];

// GET /api/documents
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: documentsStore,
  });
});

// POST /api/documents
router.post('/', (req, res) => {
  const { title, document_type, risk_score, risk_level, clauses_count, tags, text } = req.body;
  const newDoc = {
    id: 'doc-' + crypto.randomBytes(4).toString('hex'),
    title: title || 'Untitled Agreement',
    document_type: document_type || 'General Legal Agreement',
    created_at: new Date().toISOString(),
    risk_score: risk_score || 50,
    risk_level: risk_level || 'needs_attention',
    clauses_count: clauses_count || 0,
    tags: Array.isArray(tags) ? tags : ['Analyzed'],
    is_sample: false,
    text_preview: text ? text.substring(0, 200) + '...' : '',
  };

  documentsStore.unshift(newDoc);

  res.json({
    success: true,
    data: newDoc,
  });
});

// DELETE /api/documents/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  documentsStore = documentsStore.filter((d) => d.id !== id);
  res.json({
    success: true,
    message: 'Document removed from workspace.',
  });
});

module.exports = router;
