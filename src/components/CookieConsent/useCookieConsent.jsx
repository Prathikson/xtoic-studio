import { useEffect, useState } from 'react';

const defaultConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

// Helper to validate if parsed object matches ConsentState shape
const isValidConsent = (obj) =>
  obj !== null &&
  typeof obj === 'object' &&
  ['essential', 'analytics', 'marketing'].every(
    (key) => key in obj && typeof obj[key] === 'boolean'
  );

export const useCookieConsent = () => {
  const [consent, setConsent] = useState(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // On mount, load consent from localStorage and validate
  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isValidConsent(parsed)) {
          setConsent(parsed);
        } else {
          setShowBanner(true);
        }
      } catch (error) {
        console.warn('Failed to parse cookie consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Listen for changes in localStorage from other tabs/windows
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'cookie-consent' && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (isValidConsent(parsed)) {
            setConsent(parsed);
          }
        } catch (error) {
          console.warn('Failed to parse cookie consent from storage event:', error);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const acceptAll = () => {
    const full = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setConsent(full);
    localStorage.setItem('cookie-consent', JSON.stringify(full));
    setShowBanner(false);
    setShowModal(false);
  };

  const saveConsent = (customConsent) => {
    setConsent(customConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(customConsent));
    setShowBanner(false);
    setShowModal(false);
  };

  return {
    consent,
    showBanner,
    showModal,
    setShowModal,
    acceptAll,
    saveConsent,
  };
};
