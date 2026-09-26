import React, { useState } from 'react';
import { Activity, Play, AlertTriangle, CheckCircle2, HelpCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from './LoadingSpinner';
import { getDemoStressTestFallback } from '../utils/demoData';

export default function StressTestView({ documentText, keyFacts = {}, language = 'en', onNavigateToAnalyze }) {
  const { t } = useLanguage();

  const presetScenarios = [
    {
      id: 'early_termination',
      title: t('stress.scenario_1'),
      description: t('stress.scenario_1_desc'),
      icon: '✈️',
    },
    {
      id: 'late_rent',
      title: t('stress.scenario_2'),
      description: t('stress.scenario_2_desc'),
      icon: '⏳',
    },
    {
      id: 'deposit_dispute',
      title: t('stress.scenario_4'),
      description: t('stress.scenario_4_desc'),
      icon: '🏠',
    },
    {
      id: 'unannounced_entry',
      title: t('stress.scenario_3'),
      description: t('stress.scenario_3_desc'),
      icon: '🔑',
    },
  ];

  const [selectedScenario, setSelectedScenario] = useState(presetScenarios[0].title);
  const [customScenario, setCustomScenario] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeScenarioQuery = isCustom ? customScenario : selectedScenario;

  const handleRunSimulation = async () => {
    if (!documentText) {
      setError(t('input.drop_title'));
      return;
    }

    if (!activeScenarioQuery.trim()) {
      setError(t('stress.select_scenario'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let data = null;
      let ok = false;

      try {
        const res = await fetch('/api/stress-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText,
            scenario: activeScenarioQuery,
            language,
            keyFacts,
          }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          data = await res.json();
          if (data?.success && data?.data) {
            ok = true;
          }
        }
      } catch (fetchErr) {
        console.warn('Stress test API unavailable, using fallback:', fetchErr);
      }

      if (!ok || !data?.data) {
        const fallback = getDemoStressTestFallback(activeScenarioQuery, language);
        data = { data: fallback };
      }

      setSimulation(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stress-test-view">
      {/* Header Banner */}
      <div className="feature-intro-card">
        <div className="intro-header">
          <div className="intro-badge">
            <Activity size={16} />
            <span>{t('stress.title').toUpperCase()}</span>
          </div>
          <span className="ai-model-tag">{t('brand.version')}</span>
        </div>
        <h2 className="intro-title">{t('stress.title')}</h2>
        <p className="intro-desc">
          {t('stress.subtitle')}
        </p>
      </div>

      {!documentText ? (
        <div className="empty-workspace-notice">
          <AlertTriangle size={36} className="text-warning" />
          <h3>{t('docs.empty_title')}</h3>
          <p>{t('docs.empty_desc')}</p>
          <button className="primary-btn" onClick={onNavigateToAnalyze}>
            {t('nav.load_sample')}
          </button>
        </div>
      ) : (
        <div className="stress-test-workspace">
          {/* Scenario Selection Panel */}
          <div className="scenario-selector-panel">
            <h3 className="section-title">{t('stress.select_scenario')}</h3>

            <div className="preset-scenarios-grid">
              {presetScenarios.map((s) => (
                <div
                  key={s.id}
                  className={`preset-card ${!isCustom && selectedScenario === s.title ? 'active' : ''}`}
                  onClick={() => {
                    setIsCustom(false);
                    setSelectedScenario(s.title);
                  }}
                >
                  <div className="preset-icon">{s.icon}</div>
                  <div className="preset-body">
                    <h4>{s.title}</h4>
                    <p>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Scenario Input */}
            <div className={`custom-scenario-box ${isCustom ? 'active' : ''}`}>
              <div className="custom-toggle" onClick={() => setIsCustom(!isCustom)}>
                <input
                  type="radio"
                  checked={isCustom}
                  onChange={() => setIsCustom(true)}
                  id="custom-radio"
                />
                <label htmlFor="custom-radio">
                  <strong>{t('stress.custom_scenario')}</strong>
                </label>
              </div>
              {isCustom && (
                <div className="custom-input-wrap">
                  <textarea
                    rows={3}
                    placeholder={t('stress.custom_placeholder')}
                    value={customScenario}
                    onChange={(e) => setCustomScenario(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="simulation-actions">
              <button
                className="run-simulation-btn"
                onClick={handleRunSimulation}
                disabled={loading || (isCustom && !customScenario.trim())}
              >
                {loading ? (
                  <>
                    <span className="spinner-sm"></span> {t('stress.running')}
                  </>
                ) : (
                  <>
                    <Play size={16} /> {t('stress.btn_run')}
                  </>
                )}
              </button>
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          {/* Loading Animation while Simulation Runs */}
          {loading && (
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <LoadingSpinner 
                message={t('stress.running') || "Running Contract Stress Test..."} 
                subtitle={`Simulating procedural consequences and financial exposure for: "${activeScenarioQuery}"`} 
              />
            </div>
          )}

          {/* Simulation Output Dashboard */}
          {simulation && !loading && (
            <div className="simulation-results-container">
              {/* Executive Summary Card */}
              <div className="simulation-summary-card">
                <div className="summary-card-header">
                  <span className="badge-tag">{t('stress.results_title').toUpperCase()}</span>
                  <h3>{simulation.scenario}</h3>
                </div>
                <p className="summary-lead-text">{simulation.guidance_summary}</p>
              </div>

              {/* Four Columns / Cards: WHAT, WHY, WHERE, WHAT NEXT */}
              <div className="four-pillars-grid">
                <div className="pillar-card pillar-what">
                  <div className="pillar-header">
                    <span className="pillar-num">1</span>
                    <h4>{t('clauses.what')}</h4>
                  </div>
                  <p className="pillar-body">
                    {simulation.procedural_steps?.[0] || t('overview.type')}
                  </p>
                </div>

                <div className="pillar-card pillar-why">
                  <div className="pillar-header">
                    <span className="pillar-num">2</span>
                    <h4>{t('clauses.why')}</h4>
                  </div>
                  <p className="pillar-body">
                    {simulation.assumptions || t('redflag.subtitle')}
                  </p>
                </div>

                <div className="pillar-card pillar-where">
                  <div className="pillar-header">
                    <span className="pillar-num">3</span>
                    <h4>{t('clauses.where')}</h4>
                  </div>
                  <p className="pillar-body">
                    {simulation.relevant_clauses?.map((c) => `${t('clauses.card_clause')} ${c.clause_number} (${c.topic})`).join(', ') || t('subnav.clauses')}
                  </p>
                </div>

                <div className="pillar-card pillar-next">
                  <div className="pillar-header">
                    <span className="pillar-num">4</span>
                    <h4>{t('clauses.what_next')}</h4>
                  </div>
                  <p className="pillar-body">
                    {simulation.procedural_steps?.[simulation.procedural_steps.length - 1] || t('checklist.advice')}
                  </p>
                </div>
              </div>

              {/* Two Column Analysis: Document Fact vs Discretionary Uncertainty */}
              <div className="stress-grid-dual">
                {/* Column A: Documented Sequential Facts & Financials */}
                <div className="stress-col fact-col">
                  <div className="col-header">
                    <CheckCircle2 size={18} className="text-success" />
                    <h4>{t('stress.financial_impact')} & {t('stress.clauses_triggered')}</h4>
                  </div>
                  <div className="col-content">
                    <h5 className="sub-header">{t('checklist.task')}:</h5>
                    <ol className="step-list">
                      {simulation.procedural_steps?.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>

                    <h5 className="sub-header mt-3">{t('financial.worst_case')}:</h5>
                    <ul className="penalty-list">
                      {simulation.known_financial_implications?.map((pen, i) => (
                        <li key={i}>
                          <DollarSign size={14} className="icon-pen" />
                          <span>{pen}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column B: Uncertainties / Landlord Discretion */}
                <div className="stress-col uncertainty-col">
                  <div className="col-header">
                    <AlertTriangle size={18} className="text-warning" />
                    <h4>{t('stress.consequences')} & {t('stress.counter_strategies')}</h4>
                  </div>
                  <div className="col-content">
                    <p className="note-text">
                      {t('redflag.subtitle')}:
                    </p>
                    <ul className="uncertainty-list">
                      {simulation.uncertainties?.map((unc, i) => (
                        <li key={i}>
                          <HelpCircle size={14} className="icon-unc" />
                          <span>{unc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Grounded Evidence Cites */}
                    <div className="grounded-evidence-box">
                      <h5>{t('hero.feature3')}:</h5>
                      {simulation.evidence?.map((ev, i) => (
                        <blockquote key={i} className="evidence-quote">
                          <strong>{t('clauses.card_clause')} {ev.clause_number}:</strong> "{ev.quote}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
