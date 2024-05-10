import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const AuthenticationServiceContext = React.createContext(null);

export const useAuthenticationService = () => useContext(AuthenticationServiceContext);

const AuthenticationService = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  useEffect(() => {
    const updateAuthState = authState?.isAuthenticated;
    if (updateAuthState !== isAuthenticated) {
      setIsAuthenticated(updateAuthState);
    }
  }, [authState, isAuthenticated]);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    oktaAuth.signOut();
  }, [oktaAuth]);

  const value = { isAuthenticated, logout };

  return (
    <AuthenticationServiceContext.Provider value={value}>
      {children}
    </AuthenticationServiceContext.Provider>
  );
};