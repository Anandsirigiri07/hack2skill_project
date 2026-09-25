import { AlertTriangle, X } from 'lucide-react';

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-banner" role="alert">
      <AlertTriangle size={18} className="error-icon" />
      <p className="error-message">{message}</p>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
