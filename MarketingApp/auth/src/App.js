import React from "react";
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Signin from './components/Signin';
import SignUp from "./components/Signup";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  // Customize your theme here
});

const muiCache = createCache({
    key: 'au',
    prepend: true,
});

// Updated: Added `history` prop for Router
export default function AuthApp({ onSignIn, history }) {
    const handleSignIn = () => {
        console.log(`auth: appjs: inside authapp handle signin`)
        onSignIn();
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
            <CacheProvider value={muiCache}>
                <Router history={history}>
                    <Routes>
                        <Route path="/auth/signin" element={<Signin onSignIn={onSignIn}/>} />
                        <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn}/>} />
                        <Route path="/" element={<Navigate replace to="/auth/signin" />} /> 
                    </Routes>
                </Router>
            </CacheProvider>
            </ThemeProvider>
        </div>
    );
}
