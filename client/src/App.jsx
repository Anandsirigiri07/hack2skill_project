import { useState, useCallback } from 'react';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import HeroSection from './components/HeroSection';
import DocumentInput from './components/DocumentInput';
import DocumentOverview from './components/DocumentOverview';
import KeyFacts from './components/KeyFacts';
import RiskDashboard from './components/RiskDashboard';
import ObligationList from './components/ObligationList';
import ClauseList from './components/ClauseList';
import ImportantDates from './components/ImportantDates';
import ActionChecklist from './components/ActionChecklist';
import ContractComparison from './components/ContractComparison';
import AskMyDocumentView from './components/AskMyDocumentView';
import StressTestView from './components/StressTestView';
import RedFlagHunter from './components/RedFlagHunter';
import FinancialExposureView from './components/FinancialExposureView';
import ContractXRayAndGraph from './components/ContractXRayAndGraph';
import MyDocumentsView from './components/MyDocumentsView';
import NegotiationCopilotModal from './components/NegotiationCopilotModal';
import DevilsAdvocateModal from './components/DevilsAdvocateModal';
import LegalContextModal from './components/LegalContextModal';
import LegalGlossaryModal from './components/LegalGlossaryModal';
import DownloadReportModal from './components/DownloadReportModal';
import ChatBox from './components/ChatBox';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBanner from './components/ErrorBanner';
import { SAMPLE_AGREEMENT_A } from './utils/sampleDocuments';
import { Layers, ShieldAlert, DollarSign, List, Activity, CalendarCheck, Sparkles, Download } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
  const { language, setLanguage, t, formatCategory, formatRiskLevel, localizeAnalysis } = useLanguage();

  // ─── Primary Navigation State ──────────────────────────────────
  // 'home' | 'analyze' | 'stress-test' | 'compare' | 'ask' | 'my-documents'
  const [activeNav, setActiveNav] = useState('home');
  const [view, setView] = useState('input'); // 'input' | 'loading' | 'results'
  const [workspaceTab, setWorkspaceTab] = useState('all'); // 'all' | 'red_flags' | 'xray_graph' | 'financial' | 'clauses' | 'stress' | 'dates'

  const [documentText, setDocumentText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Modals
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [negotiateClause, setNegotiateClause] = useState(null);
  const [devilsAdvocateClause, setDevilsAdvocateClause] = useState(null);
  const [legalContextClause, setLegalContextClause] = useState(null);

  // Clause explorer filter and highlight
  const [activeFilter, setActiveFilter] = useState('all');
  const [highlightedClause, setHighlightedClause] = useState(null);

  // Chat
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [prefillQuestion, setPrefillQuestion] = useState('');

  // ─── Analyze Document ──────────────────────────────────────────
  const handleAnalyze = useCallback(
    async (input, customTitle = null) => {
      setError(null);
      setView('loading');
      setActiveNav('analyze');
      setActiveFilter('all');
      setHighlightedClause(null);

      try {
        let fetchOptions = {};

        if (input instanceof File) {
          const formData = new FormData();
          formData.append('file', input);
          formData.append('language', language);
          fetchOptions = { method: 'POST', body: formData };
        } else {
          fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input, language }),
          };
        }

        const response = await fetch(`${API_BASE}/api/analyze`, fetchOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Analysis failed. Please try again.');
        }

        setAnalysis(data.data);
        setDocumentText(data.documentText);
        setView('results');

        // Automatically store in workspace repository (non-fatal)
        try {
          fetch(`${API_BASE}/api/documents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: customTitle || data.data.document_type || 'Analyzed Agreement',
              document_type: data.data.document_type,
              risk_score: data.data.risk_score,
              risk_level: data.data.overall_risk_level,
              clauses_count: data.data.clauses?.length || 0,
              tags: [data.data.document_type || 'Contract', 'Analyzed'],
              text: data.documentText,
            }),
          });
        } catch (e) {
          // ignore workspace store errors
        }
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.');
        setView('input');
      }
    },
    [language]
  );

  // 1-Click Sample loader
  const handleLoadSample = useCallback(() => {
    setActiveNav('analyze');
    handleAnalyze(SAMPLE_AGREEMENT_A, 'Residential Tenancy Agreement (Standard Indiranagar)');
  }, [handleAnalyze]);

  // Load specific document from workspace
  const handleLoadDocumentFromWorkspace = useCallback(
    (text, title) => {
      setActiveNav('analyze');
      handleAnalyze(text, title);
    },
    [handleAnalyze]
  );

  // ─── Chat Logic ────────────────────────────────────────────────
  const handleChatSend = useCallback(
    async (question) => {
      if (!documentText || chatLoading) return;

      const userMsg = { role: 'user', content: question };
      setChatMessages((prev) => [...prev, userMsg]);
      setChatLoading(true);

      try {
        const history = chatMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText,
            question,
            history,
            language,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Chat request failed.');
        }

        const assistantMsg = {
          role: 'assistant',
          content: data.data.answer,
          foundInDocument: data.data.found_in_document,
          sources: data.data.source_clauses || [],
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const errorMsg = {
          role: 'assistant',
          content: err.message || 'Sorry, something went wrong. Please try again.',
          foundInDocument: null,
          sources: [],
        };
        setChatMessages((prev) => [...prev, errorMsg]);
      } finally {
        setChatLoading(false);
      }
    },
    [documentText, chatMessages, language, chatLoading]
  );

  // ─── Draft Message ─────────────────────────────────────────────
  const handleDraftMessage = useCallback(
    async (clause) => {
      setChatOpen(true);

      const userMsg = {
        role: 'user',
        content: `Draft a polite message to my counterparty regarding Clause ${clause.clause_number} (${formatCategory(clause.category)}).`,
      };
      setChatMessages((prev) => [...prev, userMsg]);
      setChatLoading(true);

      try {
        const response = await fetch(`${API_BASE}/api/chat/draft`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText,
            clause,
            language,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to draft message.');
        }

        const assistantMsg = {
          role: 'assistant',
          content: data.data.answer,
          foundInDocument: data.data.found_in_document,
          sources: data.data.source_clauses || [],
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: err.message || 'Failed to draft message. Please try again.',
            sources: [],
          },
        ]);
      } finally {
        setChatLoading(false);
      }
    },
    [documentText, language]
  );

  // ─── Navigation and Viewing Handlers ────────────────────────────
  const handleAskQuestion = useCallback(
    (question) => {
      setActiveNav('ask');
      handleChatSend(question);
    },
    [handleChatSend]
  );

  const handleViewClause = useCallback((clauseNumber) => {
    setActiveNav('analyze');
    setWorkspaceTab('clauses');
    setHighlightedClause(clauseNumber);
    setActiveFilter('all');

    setTimeout(() => {
      const el = document.getElementById(`clause-${clauseNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    setTimeout(() => setHighlightedClause(null), 3500);
  }, []);

  const handleSelectWorkspaceTab = useCallback((tab, e) => {
    setWorkspaceTab(tab);
    if (e && e.currentTarget && typeof e.currentTarget.scrollIntoView === 'function') {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
    setTimeout(() => {
      const el = document.getElementById('workspace-content-root');
      if (el) {
        const yOffset = -140;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const handleLanguageChange = useCallback(
    (lang) => {
      setLanguage(lang);
      if (analysis && documentText) {
        handleReanalyze(lang);
      }
    },
    [analysis, documentText]
  );

  const handleReanalyze = useCallback(
    async (lang) => {
      setView('loading');
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: documentText, language: lang }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setAnalysis(data.data);
        setView('results');
      } catch (err) {
        setError(err.message);
        setView('results');
      }
    },
    [documentText]
  );

  const handleNewDocument = useCallback(() => {
    setView('input');
    setAnalysis(null);
    setDocumentText('');
    setChatMessages([]);
    setError(null);
    setActiveFilter('all');
    setHighlightedClause(null);
    setChatOpen(false);
  }, []);

  return (
    <div className="app">
      <Header
        activeNav={activeNav}
        onNavChange={setActiveNav}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onLoadSample={handleLoadSample}
        hasDocument={!!documentText}
      />

      <Disclaimer />

      <main className="main-content">
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

        {/* ─── PRIMARY TAB 1: HOME ─────────────────────────────────── */}
        {activeNav === 'home' && (
          <div className="home-view">
            <HeroSection
              onStartAnalysis={() => {
                setActiveNav('analyze');
                setView('input');
              }}
              onLoadSample={handleLoadSample}
              onStartCompare={() => setActiveNav('compare')}
            />

            {/* Quick Feature Pillars Overview */}
            <div className="home-capabilities-grid">
              <div
                className="cap-card"
                onClick={() => {
                  if (!documentText) handleLoadSample();
                  else setActiveNav('analyze');
                }}
              >
                <div className="cap-icon">🔬</div>
                <h3>{t('cap.xray_title')}</h3>
                <p>{t('cap.xray_desc')}</p>
                <span className="cap-action">{t('cap.xray_action')}</span>
              </div>

              <div
                className="cap-card"
                onClick={() => {
                  if (!documentText) handleLoadSample();
                  setActiveNav('stress-test');
                }}
              >
                <div className="cap-icon">⚡</div>
                <h3>{t('cap.stress_title')}</h3>
                <p>{t('cap.stress_desc')}</p>
                <span className="cap-action">{t('cap.stress_action')}</span>
              </div>

              <div className="cap-card" onClick={() => setActiveNav('compare')}>
                <div className="cap-icon">⚖️</div>
                <h3>{t('cap.diff_title')}</h3>
                <p>{t('cap.diff_desc')}</p>
                <span className="cap-action">{t('cap.diff_action')}</span>
              </div>

              <div
                className="cap-card"
                onClick={() => {
                  if (!documentText) handleLoadSample();
                  setActiveNav('ask');
                }}
              >
                <div className="cap-icon">💬</div>
                <h3>{t('cap.qa_title')}</h3>
                <p>{t('cap.qa_desc')}</p>
                <span className="cap-action">{t('cap.qa_action')}</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── PRIMARY TAB 2: ANALYZE / DOCUMENT WORKSPACE ─────────── */}
        {activeNav === 'analyze' && (
          <>
            {view === 'input' && (
              <DocumentInput onAnalyze={handleAnalyze} loading={false} />
            )}

            {view === 'loading' && <LoadingSpinner />}

            {view === 'results' && analysis && (
              <div className="results-layout">
                <div className="results-main">
                  {/* Contextual Workspace Sub-Navigation Toolbar */}
                  <div className="workspace-subnav-toolbar" role="tablist">
                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'all' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('all', e)}
                    >
                      <Layers size={15} />
                      <span>{t('subnav.all')}</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'red_flags' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('red_flags', e)}
                    >
                      <ShieldAlert size={15} />
                      <span>{t('subnav.red_flags')} ({analysis.red_flags?.length || 0})</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'xray_graph' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('xray_graph', e)}
                    >
                      <Activity size={15} />
                      <span>{t('subnav.xray_graph')}</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'financial' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('financial', e)}
                    >
                      <DollarSign size={15} />
                      <span>{t('subnav.financial')}</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'clauses' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('clauses', e)}
                    >
                      <List size={15} />
                      <span>{t('subnav.clauses')} ({analysis.clauses?.length || 0})</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'stress' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('stress', e)}
                    >
                      <Activity size={15} />
                      <span>{t('subnav.stress')}</span>
                    </button>

                    <button
                      type="button"
                      className={`subnav-btn ${workspaceTab === 'dates' ? 'active' : ''}`}
                      onClick={(e) => handleSelectWorkspaceTab('dates', e)}
                    >
                      <CalendarCheck size={15} />
                      <span>{t('subnav.dates')}</span>
                    </button>
                  </div>

                  <div id="workspace-content-root">
                    {/* Compact header when filtering to a specific sub-workspace */}
                    {workspaceTab !== 'all' && (
                      <div className="workspace-compact-header animate-in">
                        <div className="compact-header-info">
                          <span className="compact-doc-badge">
                            <Sparkles size={13} />
                            <span>{analysis.document_type || t('overview.type')}</span>
                          </span>
                          <span className="compact-doc-title">
                            {analysis.key_facts?.property_address ||
                             (analysis.document_summary ? analysis.document_summary.slice(0, 60) + '...' : t('overview.title'))}
                          </span>
                          <span className={`compact-risk-pill ${
                            analysis.overall_risk_level === 'high_concern' ? 'risk-high' :
                            analysis.overall_risk_level === 'needs_attention' ? 'risk-medium' : 'risk-low'
                          }`}>
                            {t('overview.risk_score')}: {analysis.risk_score}/100
                          </span>
                        </div>
                        <div className="compact-header-actions">
                          <button
                            type="button"
                            className="btn-compact-report"
                            onClick={() => setReportOpen(true)}
                          >
                            <Download size={13} />
                            <span>{t('report.btn_download')}</span>
                          </button>
                          <button
                            type="button"
                            className="btn-compact-full"
                            onClick={(e) => handleSelectWorkspaceTab('all', e)}
                          >
                            <Layers size={13} />
                            <span>{t('subnav.all')}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SUBVIEW A: FULL WORKSPACE */}
                    {workspaceTab === 'all' && (
                      <div className="workspace-subview-all animate-in">
                        <DocumentOverview
                          summary={analysis.document_summary}
                          riskLevel={analysis.overall_risk_level}
                          riskScore={analysis.risk_score}
                          clauseCount={analysis.clauses?.length || 0}
                          documentType={analysis.document_type}
                          fromCache={analysis.fromCache}
                          onOpenReport={() => setReportOpen(true)}
                          onNewDocument={handleNewDocument}
                        />

                        <KeyFacts keyFacts={analysis.key_facts} onViewClause={handleViewClause} />

                        {/* Red Flag Hunter */}
                        <RedFlagHunter
                          redFlags={analysis.red_flags || []}
                          onViewClause={handleViewClause}
                          onOpenNegotiation={setNegotiateClause}
                          onOpenDevilsAdvocate={setDevilsAdvocateClause}
                          onOpenLegalContext={setLegalContextClause}
                        />

                        {/* Contract X-Ray & Relationship Graph */}
                        <ContractXRayAndGraph
                          clauses={analysis.clauses || []}
                          clauseRelationships={analysis.clause_relationships || { nodes: [], edges: [] }}
                          onViewClause={handleViewClause}
                          onOpenNegotiation={setNegotiateClause}
                        />

                        {/* Deterministic Financial Exposure */}
                        <FinancialExposureView
                          financialExposure={analysis.financial_exposure || {}}
                          keyFacts={analysis.key_facts || {}}
                        />

                        {/* Risk Dashboard & Category Filter */}
                        <RiskDashboard
                          clauses={analysis.clauses || []}
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                          onViewClause={handleViewClause}
                        />

                        {/* Obligations */}
                        <ObligationList
                          obligations={analysis.obligations || []}
                          onViewClause={handleViewClause}
                        />

                        {/* Clause List with 4 Pillars & Copilots */}
                        <ClauseList
                          clauses={analysis.clauses || []}
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                          highlightedClause={highlightedClause}
                          onAskQuestion={handleAskQuestion}
                          onDraftMessage={handleDraftMessage}
                          onOpenNegotiation={setNegotiateClause}
                          onOpenDevilsAdvocate={setDevilsAdvocateClause}
                          onOpenLegalContext={setLegalContextClause}
                        />

                        {/* Important Dates */}
                        <ImportantDates
                          dates={analysis.important_dates || []}
                          onViewClause={handleViewClause}
                        />

                        {/* Action Checklist */}
                        <ActionChecklist
                          checklist={analysis.action_checklist || []}
                          onViewClause={handleViewClause}
                        />
                      </div>
                    )}

                    {/* SUBVIEW B: RED FLAGS ONLY */}
                    {workspaceTab === 'red_flags' && (
                      <div className="workspace-subview animate-in">
                        <RedFlagHunter
                          redFlags={analysis.red_flags || []}
                          onViewClause={handleViewClause}
                          onOpenNegotiation={setNegotiateClause}
                          onOpenDevilsAdvocate={setDevilsAdvocateClause}
                          onOpenLegalContext={setLegalContextClause}
                        />
                      </div>
                    )}

                    {/* SUBVIEW C: X-RAY & GRAPH */}
                    {workspaceTab === 'xray_graph' && (
                      <div className="workspace-subview animate-in">
                        <ContractXRayAndGraph
                          clauses={analysis.clauses || []}
                          clauseRelationships={analysis.clause_relationships || { nodes: [], edges: [] }}
                          onViewClause={handleViewClause}
                          onOpenNegotiation={setNegotiateClause}
                        />
                      </div>
                    )}

                    {/* SUBVIEW D: FINANCIAL EXPOSURE */}
                    {workspaceTab === 'financial' && (
                      <div className="workspace-subview animate-in">
                        <FinancialExposureView
                          financialExposure={analysis.financial_exposure || {}}
                          keyFacts={analysis.key_facts || {}}
                        />
                      </div>
                    )}

                    {/* SUBVIEW E: CLAUSE EXPLORER */}
                    {workspaceTab === 'clauses' && (
                      <div className="workspace-subview animate-in">
                        <RiskDashboard
                          clauses={analysis.clauses || []}
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                          onViewClause={handleViewClause}
                        />
                        <ClauseList
                          clauses={analysis.clauses || []}
                          activeFilter={activeFilter}
                          onFilterChange={setActiveFilter}
                          highlightedClause={highlightedClause}
                          onAskQuestion={handleAskQuestion}
                          onDraftMessage={handleDraftMessage}
                          onOpenNegotiation={setNegotiateClause}
                          onOpenDevilsAdvocate={setDevilsAdvocateClause}
                          onOpenLegalContext={setLegalContextClause}
                        />
                      </div>
                    )}

                    {/* SUBVIEW F: STRESS TEST INSIDE WORKSPACE */}
                    {workspaceTab === 'stress' && (
                      <div className="workspace-subview animate-in">
                        <StressTestView
                          documentText={documentText}
                          keyFacts={analysis.key_facts || {}}
                          language={language}
                          onNavigateToAnalyze={() => handleSelectWorkspaceTab('all')}
                        />
                      </div>
                    )}

                    {/* SUBVIEW G: DATES & ACTIONS */}
                    {workspaceTab === 'dates' && (
                      <div className="workspace-subview animate-in">
                        <ImportantDates
                          dates={analysis.important_dates || []}
                          onViewClause={handleViewClause}
                        />
                        <ActionChecklist
                          checklist={analysis.action_checklist || []}
                          onViewClause={handleViewClause}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Q&A Chat Drawer */}
                <ChatBox
                  messages={chatMessages}
                  onSendMessage={handleChatSend}
                  loading={chatLoading}
                  onViewClause={handleViewClause}
                  isOpen={chatOpen}
                  onToggle={() => setChatOpen(!chatOpen)}
                  prefillQuestion={prefillQuestion}
                  onClearPrefill={() => setPrefillQuestion('')}
                />
              </div>
            )}
          </>
        )}

        {/* ─── PRIMARY TAB 3: STRESS TEST ─────────────────────────── */}
        {activeNav === 'stress-test' && (
          <StressTestView
            documentText={documentText}
            keyFacts={analysis?.key_facts || {}}
            language={language}
            onNavigateToAnalyze={() => {
              setActiveNav('analyze');
              if (!analysis) handleLoadSample();
            }}
          />
        )}

        {/* ─── PRIMARY TAB 4: COMPARE CONTRACTS ───────────────────── */}
        {activeNav === 'compare' && <ContractComparison language={language} />}

        {/* ─── PRIMARY TAB 5: ASK MY DOCUMENT ─────────────────────── */}
        {activeNav === 'ask' && (
          <AskMyDocumentView
            documentText={documentText}
            messages={chatMessages}
            onSendMessage={handleChatSend}
            loading={chatLoading}
            onViewClause={handleViewClause}
            onLoadSampleIfEmpty={handleLoadSample}
          />
        )}

        {/* ─── PRIMARY TAB 6: MY DOCUMENTS ────────────────────────── */}
        {activeNav === 'my-documents' && (
          <MyDocumentsView
            onLoadDocument={handleLoadDocumentFromWorkspace}
            onStartAnalysis={() => {
              setActiveNav('analyze');
              setView('input');
            }}
            onStartCompare={() => setActiveNav('compare')}
          />
        )}
      </main>

      {/* ─── MODALS ──────────────────────────────────────────────── */}
      {/* 1. Negotiation Copilot Modal */}
      <NegotiationCopilotModal
        isOpen={!!negotiateClause}
        onClose={() => setNegotiateClause(null)}
        clause={negotiateClause}
        documentText={documentText}
        language={language}
      />

      {/* 2. Devil's Advocate Modal */}
      <DevilsAdvocateModal
        isOpen={!!devilsAdvocateClause}
        onClose={() => setDevilsAdvocateClause(null)}
        clause={devilsAdvocateClause}
        documentText={documentText}
        language={language}
      />

      {/* 3. Legal Context Verification Modal */}
      <LegalContextModal
        isOpen={!!legalContextClause}
        onClose={() => setLegalContextClause(null)}
        clause={legalContextClause}
        documentText={documentText}
        language={language}
      />

      {/* 4. Legal Terms Glossary Modal */}
      <LegalGlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />

      {/* 5. Downloadable / Printable Audit Report */}
      <DownloadReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        analysis={analysis}
        documentText={documentText}
      />
    </div>
  );
}

function formatCategory(cat) {
  if (!cat) return 'General';
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
