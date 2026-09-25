import React, { useState, useEffect } from 'react';
import { Scale, Sparkles, Calculator, ShieldAlert, Network, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingSpinner({ 
  message, 
  subtitle, 
  type = 'analyze',
  customSteps = null 
}) {
  const { t, language } = useLanguage();

  const defaultSteps = [
    { id: 1, label: language === 'hi' ? 'दस्तावेज़ संरचना और क्लॉज़ टोकनाइज़ेशन...' : language === 'kn' ? 'ದಾಖಲೆಯ ರಚನೆ ಮತ್ತು ನಿಯಮಗಳ ವಿಶ್ಲೇಷಣೆ...' : 'Reading & tokenizing document clauses...', icon: Scale, duration: 1500 },
    { id: 2, label: language === 'hi' ? 'Gemini 3.6 Flash: कानूनी दायित्वों का सिमेंटिक निष्कर्षण...' : language === 'kn' ? 'Gemini 3.6 Flash: ಕಾನೂನು ಹೊಣೆಗಾರಿಕೆಗಳ ಹೊರತೆಗೆಯುವಿಕೆ...' : 'Gemini 3.6 Flash: Semantic classification & entity extraction...', icon: Sparkles, duration: 2500 },
    { id: 3, label: language === 'hi' ? 'कैलकुलेटर: वित्तीय प्रतिबद्धताओं की सटीक गणना...' : language === 'kn' ? 'ಕ್ಯಾಲ್ಕುಲೇಟರ್: ಹಣಕಾಸಿನ ಹೊಣೆಗಾರಿಕೆಗಳ ನಿಖರ ಲೆಕ್ಕಾಚಾರ...' : 'Executing deterministic arithmetic in calculator.js...', icon: Calculator, duration: 2000 },
    { id: 4, label: language === 'hi' ? 'एकतरफा जोखिम और रेड फ्लैग्स का गहन विश्लेषण...' : language === 'kn' ? 'ರೆಡ್ ಫ್ಲ್ಯಾಗ್‌ಗಳು ಮತ್ತು ಅಪಾಯಕಾರಿ ಷರತ್ತುಗಳ ಪತ್ತೆ...' : 'Scanning for asymmetric red flags & statutory deviations...', icon: ShieldAlert, duration: 2000 },
    { id: 5, label: language === 'hi' ? 'इंटरैक्टिव क्लॉज़ रिलेशनशिप ग्राफ तैयार हो रहा है...' : language === 'kn' ? 'ಸಂಬಂಧಿತ ನಿಯಮಗಳ ಗ್ರಾಫ್ ರಚಿಸಲಾಗುತ್ತಿದೆ...' : 'Synthesizing cross-clause relationship graph...', icon: Network, duration: 2000 }
  ];

  const steps = customSteps || defaultSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 92) {
          const increment = Math.floor(Math.random() * 8) + 4;
          return Math.min(prev + increment, 94);
        }
        return prev;
      });
    }, 450);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [steps.length]);

  const displayTitle = message || t('loading.message') || 'Analyzing Legal Agreement';
  const displaySubtitle = subtitle || t('loading.submessage') || 'Powered by Google Gemini 3.6 Flash & Deterministic Arithmetic Engine';

  return (
    <div className="premium-loading-page animate-in">
      {/* Upper Glowing Status Pill */}
      <div className="loading-security-badge">
        <ShieldCheck size={14} className="security-icon" />
        <span>Fail-Closed Security • Zero-Hallucination Guardrails Active</span>
      </div>

      {/* Main Orbital Animation */}
      <div className="loading-orbit-wrapper">
        <div className="orbit-ring orbit-ring-outer"></div>
        <div className="orbit-ring orbit-ring-inner"></div>
        <div className="orbit-core">
          <Scale size={32} className="core-icon-pulse" />
        </div>
        <div className="orbit-satellite satellite-1">
          <Sparkles size={14} />
        </div>
        <div className="orbit-satellite satellite-2">
          <Calculator size={14} />
        </div>
        <div className="orbit-satellite satellite-3">
          <ShieldAlert size={14} />
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="loading-text-block">
        <h2 className="loading-main-title">{displayTitle}</h2>
        <p className="loading-main-subtitle">{displaySubtitle}</p>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="loading-progress-container">
        <div className="progress-header">
          <span className="progress-label">
            <Loader2 size={13} className="spin-fast" />
            {steps[currentStepIndex]?.label}
          </span>
          <span className="progress-percent">{progress}%</span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Step-by-Step Intelligence Milestones */}
      <div className="loading-steps-card">
        <div className="steps-header">
          <span>AI Pipeline Milestones</span>
          <span className="model-tag">gemini-3.6-flash</span>
        </div>
        <div className="steps-list">
          {steps.map((s, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const Icon = s.icon || CheckCircle2;

            return (
              <div 
                key={s.id} 
                className={`step-row ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}
              >
                <div className="step-icon-col">
                  {isDone ? (
                    <CheckCircle2 size={16} className="step-check done-icon" />
                  ) : isCurrent ? (
                    <Loader2 size={16} className="step-spinner spin-fast" />
                  ) : (
                    <div className="step-dot"></div>
                  )}
                </div>
                <div className="step-label-col">
                  <span className="step-text">{s.label}</span>
                </div>
                <div className="step-status-col">
                  {isDone ? (
                    <span className="badge-done">Ready</span>
                  ) : isCurrent ? (
                    <span className="badge-running">Processing</span>
                  ) : (
                    <span className="badge-pending">Queued</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shimmer Skeleton Preview Grid */}
      <div className="loading-skeleton-preview">
        <div className="skeleton-pill shimmer"></div>
        <div className="skeleton-grid">
          <div className="skeleton-card shimmer">
            <div className="sk-line title"></div>
            <div className="sk-line body"></div>
            <div className="sk-line body short"></div>
          </div>
          <div className="skeleton-card shimmer">
            <div className="sk-line title"></div>
            <div className="sk-line body"></div>
            <div className="sk-line body short"></div>
          </div>
          <div className="skeleton-card shimmer">
            <div className="sk-line title"></div>
            <div className="sk-line body"></div>
            <div className="sk-line body short"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
