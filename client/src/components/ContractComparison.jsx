import { useState } from 'react';
import {
  Scale, FileText, ArrowRight, CheckCircle,
  Sparkles, RefreshCw, Copy, Check
} from 'lucide-react';
import { SAMPLE_AGREEMENT_A, SAMPLE_AGREEMENT_B } from '../utils/sampleDocuments';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import { getDemoComparisonFallback } from '../utils/demoData';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function ContractComparison() {
  const { language, t } = useLanguage();
  const [docAText, setDocAText] = useState('');
  const [docBText, setDocBText] = useState('');
  const [docAName, setDocAName] = useState(t('compare.doc_a'));
  const [docBName, setDocBName] = useState(t('compare.doc_b'));
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'diffs' | 'tips'
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Load sample agreements A & B for instant 1-click demo
  const handleLoadSamples = () => {
    setDocAText(SAMPLE_AGREEMENT_A);
    setDocBText(SAMPLE_AGREEMENT_B);
    setDocAName(t('compare.doc_a'));
    setDocBName(t('compare.doc_b'));
    setError(null);
  };

  const handleCompare = async () => {
    if (!docAText.trim() || !docBText.trim()) {
      setError(t('compare.placeholder_a'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data = null;
      let ok = false;

      try {
        const response = await fetch(`${API_BASE}/api/compare`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            textA: docAText.trim(),
            textB: docBText.trim(),
            language,
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          data = await response.json();
          if (data?.success && data?.data) {
            ok = true;
          }
        }
      } catch (fetchErr) {
        console.warn('Compare API unavailable, using fallback:', fetchErr);
      }

      if (!ok || !data?.data) {
        const fallback = getDemoComparisonFallback(docAText, docBText, language);
        data = { data: fallback };
      }

      setComparison(data.data);
    } catch (err) {
      setError(err.message || 'Comparison failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTip = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="compare-view-container animate-in">
      {/* Top Header */}
      <div className="compare-header-box">
        <div className="compare-badge">
          <Scale size={14} />
          <span>{t('compare.title')}</span>
        </div>
        <h2 className="compare-title">
          {t('compare.title')}
        </h2>
        <p className="compare-subtitle">
          {t('compare.subtitle')}
        </p>

        <div className="compare-quick-actions">
          <button className="sample-load-pill" onClick={handleLoadSamples}>
            <Sparkles size={14} />
            <span>{t('compare.btn_load_samples')}</span>
          </button>
        </div>
      </div>

      {/* Dual Upload / Text Inputs */}
      <div className="dual-inputs-grid">
        {/* Document A */}
        <div className="doc-input-box">
          <div className="doc-input-header">
            <div className="doc-title-row">
              <span className="doc-letter-tag a">A</span>
              <h3>{docAName}</h3>
            </div>
            <span className="doc-char-count">{docAText.length.toLocaleString()} {t('input.char_count')}</span>
          </div>

          <textarea
            className="compare-textarea"
            placeholder={t('compare.placeholder_a')}
            value={docAText}
            onChange={(e) => setDocAText(e.target.value)}
            rows={8}
          />
        </div>

        {/* Document B */}
        <div className="doc-input-box">
          <div className="doc-input-header">
            <div className="doc-title-row">
              <span className="doc-letter-tag b">B</span>
              <h3>{docBName}</h3>
            </div>
            <span className="doc-char-count">{docBText.length.toLocaleString()} {t('input.char_count')}</span>
          </div>

          <textarea
            className="compare-textarea"
            placeholder={t('compare.placeholder_b')}
            value={docBText}
            onChange={(e) => setDocBText(e.target.value)}
            rows={8}
          />
        </div>
      </div>

      {/* Compare Action Button */}
      <div className="compare-action-bar">
        {error && <p className="compare-error-msg">{error}</p>}
        <button
          className="btn-primary compare-run-btn"
          onClick={handleCompare}
          disabled={loading || !docAText || !docBText}
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="spin-icon" />
              {t('compare.comparing')}
            </>
          ) : (
            <>
              <Scale size={18} />
              {t('compare.btn_compare')}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="compare-loading-wrapper">
          <LoadingSpinner 
            message={t('compare.running') || "Comparing Legal Contracts..."}
            subtitle="Executing semantic clause diffing, risk shifts, and favorability analysis with Gemini 3.6 Flash"
            customSteps={[
              { id: 1, label: 'Aligning corresponding clauses across Document A & Document B...', duration: 1500 },
              { id: 2, label: 'Gemini 3.6 Flash: Evaluating semantic risk shifts & discrepancies...', duration: 2500 },
              { id: 3, label: 'Computing favorability scores & negotiation redlines...', duration: 2000 }
            ]}
          />
        </div>
      )}

      {/* Comparison Results */}
      {comparison && !loading && (
        <div className="comparison-results-card animate-in">
          {/* Executive Overview */}
          <div className="comparison-overview-section">
            <h3 className="section-title">
              <FileText size={18} className="header-icon" />
              {t('compare.summary')}
            </h3>
            <p className="comparison-overview-p">
              {comparison.comparison_summary?.overview}
            </p>

            <div className="favorable-split-grid">
              <div className="favorable-box doc-a-box">
                <div className="favorable-header">
                  <span className="badge-tag doc-a">{t('compare.doc_a')}</span>
                </div>
                <ul className="favorable-list">
                  {comparison.comparison_summary?.doc_a_favorable_points?.map((pt, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="favorable-icon a" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="favorable-box doc-b-box">
                <div className="favorable-header">
                  <span className="badge-tag doc-b">{t('compare.doc_b')}</span>
                </div>
                <ul className="favorable-list">
                  {comparison.comparison_summary?.doc_b_favorable_points?.map((pt, i) => (
                    <li key={i}>
                      <CheckCircle size={14} className="favorable-icon b" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Results Navigation Tabs */}
          <div className="results-subtabs">
            <button
              className={`subtab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
            >
              📊 {t('compare.side_by_side')}
            </button>
            <button
              className={`subtab-btn ${activeTab === 'diffs' ? 'active' : ''}`}
              onClick={() => setActiveTab('diffs')}
            >
              🔍 {t('compare.key_differences')}
            </button>
            <button
              className={`subtab-btn ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveTab('tips')}
            >
              💡 {t('negotiate.talking_points')} ({comparison.negotiation_tips?.length || 0})
            </button>
          </div>

          {/* Tab 1: Side-by-Side Matrix Table */}
          {activeTab === 'matrix' && (
            <div className="matrix-table-container">
              <div className="table-responsive">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th style={{ width: '18%' }}>{t('clauses.title')}</th>
                      <th style={{ width: '25%' }}>{t('compare.doc_a')}</th>
                      <th style={{ width: '25%' }}>{t('compare.doc_b')}</th>
                      <th style={{ width: '16%' }}>{t('compare.key_differences')}</th>
                      <th style={{ width: '16%' }}>{t('checklist.task')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.comparison_matrix?.map((row, idx) => (
                      <tr key={idx}>
                        <td className="category-cell">
                          <strong>{row.category}</strong>
                        </td>
                        <td className="doc-cell doc-a-cell">
                          <span className="cell-val">{row.doc_a_value}</span>
                        </td>
                        <td className="doc-cell doc-b-cell">
                          <span className="cell-val">{row.doc_b_value}</span>
                        </td>
                        <td className="diff-cell">
                          <span className="diff-text">{row.difference_summary}</span>
                        </td>
                        <td className="favorability-cell">
                          <span className={`favor-badge ${row.favorability}`}>
                            {row.favorability}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Clause-by-Clause Diff */}
          {activeTab === 'diffs' && (
            <div className="clause-diffs-container">
              {comparison.clause_diffs?.map((diff, i) => (
                <div key={i} className="clause-diff-card">
                  <div className="diff-card-header">
                    <h4 className="diff-topic-title">{diff.topic}</h4>
                    <span className="diff-change-badge">{t('compare.key_differences')}</span>
                  </div>

                  <div className="diff-side-by-side">
                    <div className="diff-column doc-a">
                      <div className="diff-column-title">
                        <span className="doc-letter-tag a">A</span>
                        <span>{t('compare.doc_a')}</span>
                      </div>
                      <blockquote className="diff-quote a">
                        {diff.doc_a_text}
                      </blockquote>
                    </div>

                    <div className="diff-column doc-b">
                      <div className="diff-column-title">
                        <span className="doc-letter-tag b">B</span>
                        <span>{t('compare.doc_b')}</span>
                      </div>
                      <blockquote className="diff-quote b">
                        {diff.doc_b_text}
                      </blockquote>
                    </div>
                  </div>

                  <div className="diff-footer">
                    <div className="diff-footer-item">
                      <span className="diff-footer-label">{t('clauses.what')}:</span>
                      <p className="diff-footer-text">{diff.change_description}</p>
                    </div>
                    <div className="diff-footer-item impact">
                      <span className="diff-footer-label">{t('clauses.why')}:</span>
                      <p className="diff-footer-text">{diff.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Negotiation Leverage */}
          {activeTab === 'tips' && (
            <div className="negotiation-tips-section">
              <div className="tips-grid">
                {comparison.negotiation_tips?.map((tip, idx) => (
                  <div key={idx} className="tip-card">
                    <div className="tip-header">
                      <span className="tip-number">#{idx + 1}</span>
                      <button
                        className="tip-copy-btn"
                        onClick={() => handleCopyTip(tip, idx)}
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={12} className="text-green" />
                            <span>{t('modal.copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>{t('modal.copy')}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="tip-content">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
