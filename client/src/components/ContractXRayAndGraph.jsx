import React, { useState } from 'react';
import { Layers, Network, Eye, ArrowRight, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContractXRayAndGraph({
  clauses = [],
  clauseRelationships = { nodes: [], edges: [] },
  onViewClause,
  onOpenNegotiation,
}) {
  const { t, formatCategory, formatRiskLevel } = useLanguage();
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'xray' | 'graph'

  const totalClauses = clauses.length;
  const highConcern = clauses.filter((c) => c.risk_level === 'high_concern');
  const needsAttention = clauses.filter((c) => c.risk_level === 'needs_attention');
  const lowConcern = clauses.filter((c) => c.risk_level === 'low_concern');

  const highPct = totalClauses ? Math.round((highConcern.length / totalClauses) * 100) : 0;
  const medPct = totalClauses ? Math.round((needsAttention.length / totalClauses) * 100) : 0;
  const lowPct = totalClauses ? 100 - highPct - medPct : 100;

  const activeNodeData = selectedNode
    ? clauses.find((c) => c.clause_number === selectedNode.number)
    : null;

  const connectedEdges = selectedNode
    ? clauseRelationships.edges.filter(
        (e) => e.source === selectedNode.id || e.target === selectedNode.id
      )
    : [];

  return (
    <div className="contract-xray-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="header-left">
          <div className="badge-xray">
            <Layers size={16} />
            <span>{t('xray.header_badge')}</span>
          </div>
          <h3>{t('xray.header_title')}</h3>
        </div>
        <div className="view-toggle-tabs">
          <button
            className={`toggle-tab ${viewMode === 'both' ? 'active' : ''}`}
            onClick={() => setViewMode('both')}
          >
            {t('xray.tab_combined')}
          </button>
          <button
            className={`toggle-tab ${viewMode === 'xray' ? 'active' : ''}`}
            onClick={() => setViewMode('xray')}
          >
            {t('xray.tab_bar')}
          </button>
          <button
            className={`toggle-tab ${viewMode === 'graph' ? 'active' : ''}`}
            onClick={() => setViewMode('graph')}
          >
            {t('xray.tab_graph')}
          </button>
        </div>
      </div>

      {/* 1. CONTRACT X-RAY BAR */}
      {(viewMode === 'both' || viewMode === 'xray') && (
        <div className="xray-section">
          <h4 className="sub-title">{t('xray.dist_title')}</h4>
          <div className="xray-progress-bar">
            {highPct > 0 && (
              <div
                className="xray-segment high"
                style={{ width: `${highPct}%` }}
                title={`${highConcern.length} ${t('risk.high')} (${highPct}%)`}
              >
                <span>{highPct}% {t('risk.high')}</span>
              </div>
            )}
            {medPct > 0 && (
              <div
                className="xray-segment medium"
                style={{ width: `${medPct}%` }}
                title={`${needsAttention.length} ${t('risk.medium')} (${medPct}%)`}
              >
                <span>{medPct}% {t('risk.medium')}</span>
              </div>
            )}
            {lowPct > 0 && (
              <div
                className="xray-segment low"
                style={{ width: `${lowPct}%` }}
                title={`${lowConcern.length} ${t('risk.low')} (${lowPct}%)`}
              >
                <span>{lowPct}% {t('risk.low')}</span>
              </div>
            )}
          </div>

          {/* Clause Heat Strips (Interactive Timeline) */}
          <div className="clause-heat-strip">
            {clauses.map((c) => (
              <div
                key={c.clause_number}
                className={`heat-cell ${c.risk_level} ${selectedNode?.number === c.clause_number ? 'selected' : ''}`}
                onClick={() =>
                  setSelectedNode({
                    id: `clause-${c.clause_number}`,
                    number: c.clause_number,
                    label: `${t('clauses.card_clause')} ${c.clause_number}`,
                    category: c.category,
                    risk: c.risk_level,
                  })
                }
                title={`${t('clauses.card_clause')} ${c.clause_number}: ${formatCategory(c.category)} (${formatRiskLevel(c.risk_level)})`}
              >
                <span className="heat-num">{c.clause_number}</span>
              </div>
            ))}
          </div>
          <div className="heat-legend">
            <span>{t('xray.legend_high_full')}</span>
            <span>{t('xray.legend_med_full')}</span>
            <span>{t('xray.legend_low_full')}</span>
            <span className="tip-text">{t('xray.click_tip')}</span>
          </div>
        </div>
      )}

      {/* 2. CLAUSE RELATIONSHIP GRAPH */}
      {(viewMode === 'both' || viewMode === 'graph') && (
        <div className="clause-graph-section">
          <div className="graph-header">
            <h4 className="sub-title">
              <Network size={16} />
              <span>{t('xray.graph_title')}</span>
            </h4>
            <span className="graph-caption">
              {t('xray.graph_subtitle')}
            </span>
          </div>

          <div className="graph-interactive-container">
            {/* Visual Node Cluster */}
            <div className="node-canvas">
              <div className="nodes-grid">
                {clauses.map((c) => {
                  const isSelected = selectedNode?.number === c.clause_number;
                  const hasConnections = clauseRelationships.edges.some(
                    (e) =>
                      e.source === `clause-${c.clause_number}` ||
                      e.target === `clause-${c.clause_number}`
                  );

                  return (
                    <div
                      key={c.clause_number}
                      className={`graph-node ${c.risk_level} ${isSelected ? 'selected' : ''} ${hasConnections ? 'linked' : ''}`}
                      onClick={() =>
                        setSelectedNode({
                          id: `clause-${c.clause_number}`,
                          number: c.clause_number,
                          label: `${t('clauses.card_clause')} ${c.clause_number}`,
                          category: c.category,
                          risk: c.risk_level,
                        })
                      }
                    >
                      <div className="node-top">
                        <span className="node-badge">C-{c.clause_number}</span>
                        <span className="node-cat-name">{formatCategory(c.category)}</span>
                      </div>
                      <p className="node-summary-snippet">{c.plain_summary}</p>
                      {hasConnections && (
                        <div className="link-indicator">🔗 {t('xray.interconnected')}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Edge Legend & Connections List */}
              <div className="edges-flow-panel">
                <h5 className="edges-title">{t('xray.edges_title')}</h5>
                <div className="edges-list">
                  {clauseRelationships.edges.map((edge, idx) => (
                    <div key={idx} className="edge-item">
                      <span className="edge-node">{edge.source.replace('clause-', `${t('clauses.card_clause')} `)}</span>
                      <span className="edge-rel">─── [{edge.relationship}] ───▶</span>
                      <span className="edge-node">{edge.target.replace('clause-', `${t('clauses.card_clause')} `)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Inspector Drawer for Selected Node */}
            {activeNodeData && (
              <div className="node-inspector-card">
                <div className="inspector-top">
                  <span className={`risk-badge ${activeNodeData.risk_level}`}>
                    {formatRiskLevel(activeNodeData.risk_level)}
                  </span>
                  <h4>
                    {t('clauses.card_clause')} {activeNodeData.clause_number}: {formatCategory(activeNodeData.category)}
                  </h4>
                </div>

                <div className="inspector-body">
                  <div className="insp-item">
                    <strong>{t('clauses.what')}:</strong>
                    <p>{activeNodeData.what || activeNodeData.plain_summary}</p>
                  </div>
                  <div className="insp-item">
                    <strong>{t('clauses.why')}:</strong>
                    <p>{activeNodeData.why || activeNodeData.risk_reason}</p>
                  </div>
                  <div className="insp-item">
                    <strong>{t('clauses.where')}:</strong>
                    <p>{activeNodeData.where || `${t('clauses.card_clause')} ${activeNodeData.clause_number}`}</p>
                  </div>
                  <div className="insp-item">
                    <strong>{t('clauses.what_next')}:</strong>
                    <p>{activeNodeData.what_next || activeNodeData.suggested_question}</p>
                  </div>

                  {connectedEdges.length > 0 && (
                    <div className="insp-connected">
                      <strong>{t('xray.connected_links')}</strong>
                      <ul>
                        {connectedEdges.map((e, i) => (
                          <li key={i}>
                            {e.relationship} ({e.source === selectedNode.id ? 'Triggers ' + e.target : 'Triggered by ' + e.source})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="inspector-actions">
                  <button
                    className="jump-btn"
                    onClick={() => onViewClause(activeNodeData.clause_number)}
                  >
                    <Eye size={14} /> {t('xray.view_in_doc')}
                  </button>
                  <button
                    className="copilot-btn"
                    onClick={() => onOpenNegotiation(activeNodeData)}
                  >
                    {t('xray.negotiate_redline')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

