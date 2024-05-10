import React, { useState, useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
//import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import oktaConfig from './../services/OktaConfig';
import { useOktaAuth } from '@okta/okta-react';

const OktaSignInWidget = ({ onSignIn }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const { authState, oktaAuth } = useOktaAuth();
  const widgetRef = useRef(null);
  
  useEffect(() => {
    if (!authState) return; // Wait for authState to be determined

    setIsAuthenticated(authState.isAuthenticated);
    if (authState.isAuthenticated) {
      console.log('The user is authenticated');
      // Perform an action when the user is authenticated
    } else {
      console.log('The user is not authenticated');
      // Handle the user not being authenticated
    }
  }, [authState]);
  
  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const widget = new OktaSignIn({
      baseUrl: oktaConfig.baseUrl,
      clientId: oktaConfig.clientId,
      redirectUri: oktaConfig.redirectUri,
      authParams: {
        issuer: oktaConfig.issuer,
        scopes: oktaConfig.scopes,
      },
      i18n: {
        en: {
          'primaryauth.title': 'Sign In to your account',
          'errors.E0000006': 'Internal users use your machine to reset your password.'
        }
      },
      features: { registration: false, showPasswordToggleOnSignInPage: true, idpDiscovery: true },
      idpDiscovery: { requestContext: window.location.href }
    });

    widget.renderEl({ el: widgetRef.current }, (res) => {
      if (res.status === 'SUCCESS') {
        oktaAuth.handleLoginRedirect(res.tokens);
      }
    }, (err) => {
      console.error(`Error rendering Okta SignIn Widget: ${err}`);
    });

    return () => widget.remove();
  }, [oktaAuth]);

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        if (oktaAuth.isLoginRedirect()) {
          const tokens = await oktaAuth.handleLoginRedirect();
          if (tokens) {
            setTokenAndCurrentUser(tokens);
          }
        } else {
          const session = await oktaAuth.session.get();
          if (session.status === 'ACTIVE' && !isAuthenticated) {
            const tokens = await oktaAuth.token.getWithoutPrompt({
              clientId: oktaConfig.clientId,
              scopes: oktaConfig.scopes,
            });
            if (tokens) {
              setTokenAndCurrentUser(tokens);
            }
          } else if (isAuthenticated) {
            onSignIn(user);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleAuthentication();
  }, [isAuthenticated, oktaAuth]);

  const setTokenAndCurrentUser = (tokens) => {
    oktaAuth.tokenManager.add('accessToken', tokens.accessToken);
    oktaAuth.tokenManager.add('idToken', tokens.idToken);
    const userClaims = tokens.idToken.claims;
    setUser({
      email: userClaims.email,
      displayName: userClaims.name,
      isAuthenticated
    });
  };

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;
