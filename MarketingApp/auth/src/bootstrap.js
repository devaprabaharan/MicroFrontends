import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath = '/' }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]  // Ensure initialPath has a default fallback
    });

    // Debugging: Check the initial state of history
    console.log('Initial history state:', history.location);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    if (onNavigate) {
        //whenever a navigation occurs in marketing sub app, it calls the onNavigate
        // callback function from Container
        history.listen(onNavigate);
    }

    const root = createRoot(el); // Updated to React 18's createRoot API
    root.render(<App onSignIn={onSignIn} history={history} />);

    return {
        onParentNavigate({ pathname: nextPathName }) {
            console.log(`Current pathname: ${pathname}, Next pathname: ${nextPathName}`);
            if (!history.location) {
                console.error('History location is not defined.');
                return;
            }
            const { pathname } = history.location || {};
            console.log(`Current pathname: ${pathname}, Next pathname: ${nextPathName}`);

            if (pathname && nextPathName && pathname !== nextPathName) {
                history.push(nextPathName);
                console.log('Container just navigated');
            }
        }
    };
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-root');
    //assuming our container doesnt have an element with an id '_markerting-dev-root'
    if (el) {
        //we are running this app in isolation, so use browser history instead of Memory history
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

// Context/Situation #1
// 1. we are running development in isolation, where local index.html is used and the element dev-products is available
// 2. running in production through the container app. There is no gaurentee that an element dev-products exists

export { mount };
