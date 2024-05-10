import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import App from './App';
//import { StoreProvider } from 'store/StoreApp';

const container = document.querySelector('#root'); // Get the container to render the App
const root = createRoot(container); // Create a root instance

root.render(<App />);