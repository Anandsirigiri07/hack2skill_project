import { useState, useRef } from 'react';
import { Upload, FileText, ClipboardPaste, Sparkles, ChevronRight } from 'lucide-react';
import { SAMPLE_AGREEMENT_A } from '../utils/sampleDocuments';
import { useLanguage } from '../context/LanguageContext';

export default function DocumentInput({ onAnalyze, loading }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState('upload'); // 'upload' | 'paste'
  const [text, setText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    const ext = file.name.split('.').pop().toLowerCase();
    const validExts = ['pdf', 'docx', 'txt'];

    if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
      alert('Please upload a PDF, DOCX, or TXT file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5 MB.');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (mode === 'upload' && selectedFile) {
      onAnalyze(selectedFile);
    } else if (mode === 'paste' && text.trim().length >= 50) {
      onAnalyze(text.trim());
    }
  };

  const handleLoadSample = () => {
    setMode('paste');
    setText(SAMPLE_AGREEMENT_A);
    // Auto-analyze sample immediately for seamless demo
    onAnalyze(SAMPLE_AGREEMENT_A);
  };

  const canSubmit =
    !loading &&
    ((mode === 'upload' && selectedFile) || (mode === 'paste' && text.trim().length >= 50));

  return (
    <div className="input-container" id="document-input-area">
      <div className="input-card">
        <div className="input-card-top-bar">
          <div className="input-mode-tabs">
            <button
              className={`input-tab ${mode === 'upload' ? 'active' : ''}`}
              onClick={() => setMode('upload')}
            >
              <Upload size={16} />
              {t('input.tab_upload')}
            </button>
            <button
              className={`input-tab ${mode === 'paste' ? 'active' : ''}`}
              onClick={() => setMode('paste')}
            >
              <ClipboardPaste size={16} />
              {t('input.tab_paste')}
            </button>
          </div>

          <button className="sample-quick-btn" onClick={handleLoadSample}>
            <Sparkles size={14} />
            <span>{t('input.load_sample_btn')}</span>
          </button>
        </div>

        {mode === 'upload' ? (
          <div
            className={`upload-zone ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFile(e.target.files?.[0])}
              hidden
            />
            {selectedFile ? (
              <div className="upload-selected">
                <FileText size={32} className="file-icon" />
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
                <button
                  className="file-change"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  {t('btn.clear')}
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <div className="upload-icon-wrapper">
                  <Upload size={30} />
                </div>
                <p className="upload-text">
                  {t('input.drop_title')}, <span>{t('input.browse_btn')}</span>
                </p>
                <p className="upload-hint">{t('input.drop_subtitle')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="paste-zone">
            <textarea
              className="paste-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('input.paste_placeholder')}
              rows={10}
              disabled={loading}
            />
            <div className="paste-footer">
              <span className="char-count">
                {text.length.toLocaleString()} {t('input.char_count')}
                {text.length > 0 && text.length < 50 && ' (min 50)'}
              </span>
              {text.length > 0 && (
                <button className="paste-clear-btn" onClick={() => setText('')}>
                  {t('btn.clear')}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="input-action-footer">
          <button
            className="analyze-btn"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                {t('input.analyzing_btn')}
              </>
            ) : (
              <>
                <Sparkles size={18} />
                {t('input.analyze_btn')}
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
