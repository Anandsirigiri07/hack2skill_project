import { Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Disclaimer() {
  const { t } = useLanguage();

  return (
    <div className="disclaimer">
      <Info size={14} className="disclaimer-icon" />
      <p>
        {t('disclaimer.text')}
      </p>
    </div>
  );
}
