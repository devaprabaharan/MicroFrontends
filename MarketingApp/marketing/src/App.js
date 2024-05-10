import React from "react";
import { Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Pricing from './components/Pricing';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create a custom cache instance with a prefix
const muiCache = createCache({
  key: 'ma',  // Prefix all class names with 'ma-'
  prepend: true // Controls the insertion point of the styles
});

export default function App({ history }) {
    return (
        <CacheProvider value={muiCache}>
            <Router history={history}>
                <Routes>
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </Router>
        </CacheProvider>
    );
}