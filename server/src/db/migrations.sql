-- ============================================================
-- LegalLens AI — Production Database Schema & Inherited RLS
-- Multi-tenant, Version-aware, Hardened Row-Level Security
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspaces: owner access only" ON workspaces
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'Legal Agreement',
  file_type TEXT NOT NULL,
  file_size INT NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Documents: owner access only" ON documents
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. DOCUMENT VERSIONS TABLE (Inherited RLS)
CREATE TABLE IF NOT EXISTS document_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number INT NOT NULL DEFAULT 1,
  raw_text TEXT NOT NULL,
  char_count INT NOT NULL,
  checksum TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Document Versions: inherited ownership" ON document_versions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_versions.document_id AND d.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_versions.document_id AND d.user_id = auth.uid()
    )
  );

-- 5. CLAUSES TABLE (Inherited RLS through document_versions -> documents)
CREATE TABLE IF NOT EXISTS clauses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_version_id UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  clause_number INT NOT NULL,
  category TEXT NOT NULL,
  clause_text TEXT NOT NULL,
  plain_summary TEXT NOT NULL,
  simple_explanation TEXT,
  detailed_explanation TEXT,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low_concern', 'needs_attention', 'high_concern')),
  risk_reason TEXT,
  user_impact TEXT,
  suggested_question TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clauses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clauses: inherited ownership" ON clauses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = clauses.document_version_id AND d.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = clauses.document_version_id AND d.user_id = auth.uid()
    )
  );

-- 6. ANALYSIS RESULTS TABLE (Inherited RLS)
CREATE TABLE IF NOT EXISTS analysis_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_version_id UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  overall_risk_level TEXT NOT NULL,
  risk_score INT NOT NULL,
  key_facts JSONB NOT NULL DEFAULT '{}'::jsonb,
  obligations JSONB NOT NULL DEFAULT '[]'::jsonb,
  important_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  financial_exposure JSONB NOT NULL DEFAULT '{}'::jsonb,
  action_checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  raw_gemini_model TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Analysis Results: inherited ownership" ON analysis_results
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = analysis_results.document_version_id AND d.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = analysis_results.document_version_id AND d.user_id = auth.uid()
    )
  );

-- 7. STRESS TESTS TABLE (Inherited RLS)
CREATE TABLE IF NOT EXISTS stress_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_version_id UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  scenario TEXT NOT NULL,
  assumptions TEXT,
  procedural_steps JSONB NOT NULL,
  financial_implications JSONB NOT NULL,
  uncertainties JSONB NOT NULL,
  relevant_clause_ids JSONB NOT NULL,
  evidence JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stress_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stress Tests: inherited ownership" ON stress_tests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = stress_tests.document_version_id AND d.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_versions dv
      JOIN documents d ON d.id = dv.document_id
      WHERE dv.id = stress_tests.document_version_id AND d.user_id = auth.uid()
    )
  );

-- 8. COMPARISONS TABLE (Dual Document Ownership Check)
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  doc_a_version_id UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  doc_b_version_id UUID NOT NULL REFERENCES document_versions(id) ON DELETE CASCADE,
  summary JSONB NOT NULL,
  matrix JSONB NOT NULL,
  diffs JSONB NOT NULL,
  negotiation_tips JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comparisons: dual document ownership" ON comparisons
  FOR ALL
  USING (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM document_versions dvA
      JOIN documents dA ON dA.id = dvA.document_id
      WHERE dvA.id = comparisons.doc_a_version_id AND dA.user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM document_versions dvB
      JOIN documents dB ON dB.id = dvB.document_id
      WHERE dvB.id = comparisons.doc_b_version_id AND dB.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM document_versions dvA
      JOIN documents dA ON dA.id = dvA.document_id
      WHERE dvA.id = comparisons.doc_a_version_id AND dA.user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM document_versions dvB
      JOIN documents dB ON dB.id = dvB.document_id
      WHERE dvB.id = comparisons.doc_b_version_id AND dB.user_id = auth.uid()
    )
  );

-- 9. AUDIT LOGS TABLE (Zero document content stored)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  event_type TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit Logs: user views own events" ON audit_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- INDEXES for fast RLS evaluation
CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_versions_doc ON document_versions(document_id);
CREATE INDEX IF NOT EXISTS idx_clauses_version ON clauses(document_version_id);
CREATE INDEX IF NOT EXISTS idx_analysis_version ON analysis_results(document_version_id);
CREATE INDEX IF NOT EXISTS idx_stress_version ON stress_tests(document_version_id);
