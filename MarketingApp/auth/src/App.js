import React from "react";
import { Routes, Route, Router } from 'react-router-dom'; // Updated for React Router v6
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Signin from './components/Signin';
import SignUp from "./components/Signup";
import Login from "./components/Login";
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react'; // Assuming v7 or above for Okta React

// Create a custom Emotion cache with a specific key prefix
const cache = createCache({
    key: 'au',  // Prefix for class names, replace 'au' with whatever you prefer
    prepend: true // Prepends the styles to ensure they have higher priority (optional)
  });

const oktaAuthInstance = new OktaAuth({
    issuer: '',
    clientId: '',
    redirectUri: window.location.origin + '/implicit/callback',
  });

// const restoreOriginalUri = async (_oktaAuth, originalUri) => {
//     history.replace(originalUri || '/');
// }

export default function App({ history, onSignIn }) {
    return (
        <CacheProvider value={cache}>
           <Router history={history}>
                <Routes>
					{/* <Route path="/auth/signin" ><Signin  onSignIn={onSignIn}/></Route> */}
                    <Route path="/auth/signin" element={
                        <Security oktaAuth={oktaAuthInstance} >
                            <Login />
                        </Security>}
                    />
                        <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn}/>} />
                        <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn}/>} />
                    
                </Routes>
            </Router>
        </CacheProvider>
    );
}