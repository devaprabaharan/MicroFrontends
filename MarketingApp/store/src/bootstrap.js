import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const mount =(el)=>{

    
    const root = ReactDOM.createRoot(el);
    
    root.render(<App />);
  
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_store-dev-root');

    if (el) {
        // In isolation, mount with createBrowserHistory
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

// Context/Situation #1
// 1. we are running development in isolation, where local index.html is used and the element dev-products is available
// 2. running in production through the container app. There is no gaurentee that an element dev-products exists

export {mount};