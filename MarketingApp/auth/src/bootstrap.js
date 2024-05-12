import React from "react";
import { createRoot } from "react-dom/client";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath || "/"]
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  let root = el._reactRootContainer;
  if (!root) {
    root = createRoot(el);
    el._reactRootContainer = root;
  }
  root.render(<App onSignIn={onSignIn} history={history} />);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = history.location;
      if (pathname !== nextPathName) {
        history.push(nextPathName);
        console.log("auth: bootstrap: onparentnavigate inside auth");
      }
    },
  };
};

// Only for development standalone mode
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
