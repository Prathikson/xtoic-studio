import { createContext, useContext } from 'react';
import { useCookieConsent } from './useCookieConsent';

// Create context
const CookieConsentContext = createContext(undefined);

// Hook to consume the context
export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsentContext must be used within a CookieProviderWrapper');
  }
  return context;
};

// Provider component
const CookieProviderWrapper = ({ children }) => {
  const cookieConsent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieProviderWrapper;
