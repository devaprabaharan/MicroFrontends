import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    let root = el._reactRootContainer;
    if (!root) {
        root = createRoot(el); // Create a root instance on the element only if it does not exist
        el._reactRootContainer = root; // Store the root instance on the element
    }
       
    root.render(<App history={history} />); // Render the App component with the custom history

    // Return functions for container to manage navigation updates
    return {
        onParentNavigate({ pathname: nextPathName }) {
            
            const { pathname } = history.location;
            console.log(`marketing - bootstrap: onparentnavigate is called inside marketing currentPath: ${pathname } nextPathName:${nextPathName}`);
            if (pathname !== nextPathName) {
                history.push(nextPathName);
                console.log('marketing - bootstrap: Container just navigated inside marketing');
            }
        }
    };
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_markerting-dev-root');
    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };
