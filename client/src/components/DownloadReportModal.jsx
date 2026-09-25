import { X, Printer, Download, FileText, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DownloadReportModal({ isOpen, onClose, analysis, documentText }) {
  const { t, language, formatCategory, formatRiskLevel } = useLanguage();
  if (!isOpen || !analysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const lines = [
      '=================================================================',
      `                    ${t('brand.name').toUpperCase()} — ${t('report.modal_title').toUpperCase()}               `,
      '=================================================================',
      `Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `${t('overview.type')}: ${analysis.document_type || 'Legal Agreement'}`,
      `${t('overview.risk_score')}: ${analysis.risk_score} / 100 (${formatRiskLevel(analysis.overall_risk_level)})`,
      '-----------------------------------------------------------------',
      '',
      `1. ${t('report.sec_executive_summary').toUpperCase()}:`,
      analysis.document_summary || 'No summary available.',
      '',
      '-----------------------------------------------------------------',
      `2. ${t('report.sec_key_parameters').toUpperCase()}:`,
      `• ${t('facts.monthly_rent')}: ${analysis.key_facts?.monthly_rent || t('facts.not_specified')}`,
      `• ${t('facts.security_deposit')}: ${analysis.key_facts?.security_deposit || t('facts.not_specified')}`,
      `• ${t('facts.duration')}: ${analysis.key_facts?.duration || t('facts.not_specified')}`,
      `• ${t('facts.notice_period')}: ${analysis.key_facts?.notice_period || t('facts.not_specified')}`,
      `• ${t('facts.renewal_terms')}: ${analysis.key_facts?.renewal_terms || t('facts.not_specified')}`,
      `• ${t('facts.maintenance')}: ${analysis.key_facts?.maintenance_responsibilities || t('facts.not_specified')}`,
      `• ${t('facts.termination')}: ${analysis.key_facts?.termination_conditions || t('facts.not_specified')}`,
      `• ${t('facts.penalties')}: ${analysis.key_facts?.penalties || t('facts.not_specified')}`,
      '',
      '-----------------------------------------------------------------',
      `3. ${t('report.sec_concerning_clauses').toUpperCase()}:`,
      ...(analysis.clauses || [])
        .filter((c) => c.risk_level !== 'low_concern')
        .map(
          (c) =>
            `[${t('clauses.card_clause')} ${c.clause_number}] [${formatRiskLevel(c.risk_level)}] ${formatCategory(c.category)}\n` +
            `${t('clauses.plain_summary')}: ${c.plain_summary}\n` +
            `${t('report.why_flagged')}: ${c.risk_reason || c.why}\n` +
            (c.suggested_question ? `${t('report.suggested_q')}: "${c.suggested_question}"\n` : '')
        ),
      '',
      '-----------------------------------------------------------------',
      `4. ${t('dates.title').toUpperCase()}:`,
      ...(analysis.important_dates || []).map(
        (d) => `• ${d.event}: ${d.date_or_period} (${t('clauses.card_clause')} ${d.clause_number})`
      ),
      '',
      '-----------------------------------------------------------------',
      'DISCLAIMER / अस्वीकरण / ಹಕ್ಕು ನಿರಾಕರಣೆ:',
      t('report.footer_disclaimer'),
      '=================================================================',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LegalLens_Analysis_Report_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const highConcern = analysis.clauses?.filter((c) => c.risk_level === 'high_concern') || [];
  const needsAttention = analysis.clauses?.filter((c) => c.risk_level === 'needs_attention') || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog report-modal printable-area" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header no-print">
          <div className="modal-title-row">
            <FileText size={20} />
            <div>
              <h2 className="modal-title">{t('report.modal_title')}</h2>
              <p className="modal-subtitle">{t('report.modal_subtitle')}</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={handlePrint}>
              <Printer size={15} />
              <span>{t('report.print_pdf')}</span>
            </button>
            <button className="btn-primary" onClick={handleDownloadTxt}>
              <Download size={15} />
              <span>{t('report.download_summary')}</span>
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="report-content">
          <div className="report-doc-header">
            <div className="report-badge">{t('report.doc_badge')}</div>
            <h1 className="report-title">{analysis.document_type || t('preview.doc_title')}</h1>
            <p className="report-date">{new Date().toLocaleDateString()} | {t('report.grounded_genai')}</p>
          </div>

          <div className="report-score-box">
            <div className="report-score-num">
              <strong>{analysis.risk_score}</strong>
              <span>{t('report.risk_score_label')}</span>
            </div>
            <div className="report-score-label">
              {t('report.overall_observation')}: <strong>{formatRiskLevel(analysis.overall_risk_level)}</strong>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="report-section">
            <h3 className="report-section-title">{t('report.sec_executive_summary')}</h3>
            <p className="report-p">{analysis.document_summary}</p>
          </div>

          {/* Key Facts */}
          {analysis.key_facts && (
            <div className="report-section">
              <h3 className="report-section-title">{t('report.sec_key_parameters')}</h3>
              <div className="report-facts-grid">
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.monthly_rent')}:</span>
                  <span className="fact-v">{analysis.key_facts.monthly_rent || t('facts.not_specified')}</span>
                </div>
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.security_deposit')}:</span>
                  <span className="fact-v">{analysis.key_facts.security_deposit || t('facts.not_specified')}</span>
                </div>
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.duration')}:</span>
                  <span className="fact-v">{analysis.key_facts.duration || t('facts.not_specified')}</span>
                </div>
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.notice_period')}:</span>
                  <span className="fact-v">{analysis.key_facts.notice_period || t('facts.not_specified')}</span>
                </div>
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.renewal_terms')}:</span>
                  <span className="fact-v">{analysis.key_facts.renewal_terms || t('facts.not_specified')}</span>
                </div>
                <div className="report-fact-item">
                  <span className="fact-lbl">{t('facts.maintenance')}:</span>
                  <span className="fact-v">{analysis.key_facts.maintenance_responsibilities || t('facts.not_specified')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Concerning Clauses */}
          <div className="report-section">
            <h3 className="report-section-title">{t('report.sec_concerning_clauses')} ({highConcern.length + needsAttention.length})</h3>
            {[...highConcern, ...needsAttention].map((c) => (
              <div key={c.clause_number} className="report-clause-item">
                <div className="report-clause-top">
                  <strong>{t('clauses.card_clause')} {c.clause_number}: {formatCategory(c.category)}</strong>
                  <span className={`pill-${c.risk_level === 'high_concern' ? 'high' : 'medium'}`}>
                    {formatRiskLevel(c.risk_level)}
                  </span>
                </div>
                <p className="report-clause-summary">{c.plain_summary}</p>
                <p className="report-clause-reason"><strong>{t('report.why_flagged')}:</strong> {c.risk_reason || c.why}</p>
                {c.suggested_question && (
                  <p className="report-clause-q"><strong>{t('report.suggested_q')}:</strong> "{c.suggested_question}"</p>
                )}
              </div>
            ))}
          </div>

          <div className="report-footer">
            <p className="report-disclaimer">
              {t('report.footer_disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

