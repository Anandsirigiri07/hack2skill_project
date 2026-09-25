import { useState, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Custom hook for API calls with loading/error state management.
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || `Request failed (${response.status})`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (err) {
      const message = err.message || 'Something went wrong. Please try again.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { request, loading, error, clearError };
}
