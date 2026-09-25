import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translate, getCategoryLabel, getRiskLevelLabel, TRANSLATIONS } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('legallens_language') || 'en';
  });

  const setLanguage = useCallback((lang) => {
    if (['en', 'hi', 'kn'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('legallens_language', lang);
    }
  }, []);

  const t = useCallback(
    (keyOrText, params = {}) => {
      return translate(keyOrText, language, params);
    },
    [language]
  );

  const formatCategory = useCallback(
    (category) => {
      return getCategoryLabel(category, language);
    },
    [language]
  );

  const formatRiskLevel = useCallback(
    (riskLevel) => {
      return getRiskLevelLabel(riskLevel, language);
    },
    [language]
  );

  /**
   * Translates common metadata fields on analysis results dynamically
   */
  const localizeAnalysis = useCallback(
    (analysisData) => {
      if (!analysisData || typeof analysisData !== 'object') return analysisData;
      if (language === 'en') return analysisData;

      const clone = JSON.parse(JSON.stringify(analysisData));

      // Localize document type if standard
      if (clone.document_type) {
        if (clone.document_type.includes('Rental') || clone.document_type.includes('Lease')) {
          clone.document_type = language === 'hi' ? 'किराया / लीज समझौता' : 'ಬಾಡಿಗೆ / ಗುತ್ತಿಗೆ ಒಪ್ಪಂದ';
        } else if (clone.document_type.includes('Employment')) {
          clone.document_type = language === 'hi' ? 'रोजगार अनुबंध' : 'ಉದ್ಯೋಗ ಒಪ್ಪಂದ';
        } else if (clone.document_type.includes('NDA') || clone.document_type.includes('Non-Disclosure')) {
          clone.document_type = language === 'hi' ? 'गैर-प्रकटीकरण समझौता (NDA)' : 'ಗೌಪ್ಯತೆ ಒಪ್ಪಂದ (NDA)';
        }
      }

      // Localize red flag severities and recommended actions if standard
      if (Array.isArray(clone.red_flags)) {
        clone.red_flags = clone.red_flags.map((rf) => ({
          ...rf,
          severity: rf.severity === 'Critical' ? t('redflag.critical') : t('redflag.high_caution'),
          category_label: formatCategory(rf.category),
        }));
      }

      return clone;
    },
    [language, t, formatCategory]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatCategory,
        formatRiskLevel,
        localizeAnalysis,
        allTranslations: TRANSLATIONS[language] || TRANSLATIONS.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
