import React, { useState, useEffect } from 'react';
import { Folder, FileText, ArrowRight, Trash2, Plus, Sparkles } from 'lucide-react';
import { SAMPLE_AGREEMENT_A, SAMPLE_AGREEMENT_B } from '../utils/sampleDocuments';
import { useLanguage } from '../context/LanguageContext';

export default function MyDocumentsView({
  onLoadDocument,
  onStartAnalysis,
  onStartCompare,
}) {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/documents');
      const json = await res.json();
      if (res.ok && json.data) {
        setDocuments(json.data);
      }
    } catch (err) {
      console.warn('Using local fallback for document list', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenSample = (sampleText, title) => {
    onLoadDocument(sampleText, title);
  };

  return (
    <div className="my-documents-view">
      {/* Header */}
      <div className="feature-intro-card">
        <div className="intro-header">
          <div className="intro-badge">
            <Folder size={16} />
            <span>{t('docs.title').toUpperCase()}</span>
          </div>
          <span className="ai-model-tag">{t('brand.version')}</span>
        </div>
        <div className="intro-flex">
          <div>
            <h2 className="intro-title">{t('docs.title')}</h2>
            <p className="intro-desc">
              {t('docs.subtitle')}
            </p>
          </div>
          <button className="upload-new-btn" onClick={onStartAnalysis}>
            <Plus size={16} /> {t('btn.new_doc')}
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="doc-workspace-grid">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="doc-card"
            onClick={() => {
              if (doc.id === 'doc-sample-a') {
                handleOpenSample(SAMPLE_AGREEMENT_A, doc.title);
              } else if (doc.id === 'doc-sample-b') {
                handleOpenSample(SAMPLE_AGREEMENT_B, doc.title);
              } else {
                onStartAnalysis();
              }
            }}
          >
            <div className="doc-card-top">
              <div className="doc-icon-wrap">
                <FileText size={20} />
              </div>
              <div className="doc-meta-tags">
                <span className={`risk-tag ${doc.risk_level}`}>
                  {t('overview.risk_score')}: {doc.risk_score}/100
                </span>
              </div>
            </div>

            <h3 className="doc-title">{doc.title}</h3>
            <span className="doc-type">{doc.document_type}</span>

            <div className="doc-stats">
              <span>{doc.clauses_count} {t('subnav.clauses')}</span>
              <span>•</span>
              <span>{new Date(doc.created_at).toLocaleDateString()}</span>
            </div>

            <div className="doc-card-footer">
              <span className="open-link">
                {t('docs.btn_open')} <ArrowRight size={14} />
              </span>
              {!doc.is_sample && (
                <button
                  className="delete-doc-btn"
                  onClick={(e) => handleDelete(doc.id, e)}
                  title={t('docs.btn_delete')}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Banner */}
      <div className="quick-compare-banner mt-4">
        <div className="banner-left">
          <Sparkles size={20} className="text-warning" />
          <div>
            <h4>{t('compare.title')}</h4>
            <p>{t('compare.subtitle')}</p>
          </div>
        </div>
        <button className="primary-btn" onClick={onStartCompare}>
          {t('compare.btn_compare')}
        </button>
      </div>
    </div>
  );
}
