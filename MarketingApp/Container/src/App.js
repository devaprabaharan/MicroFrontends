import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";
const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

//unique randomly generated namespace so that css classnames will not collide with mfe's
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  //
  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    // why not browser router. whenever we create a browser router that internally creates a browser history for us
    // we have to have access to that history instance so that we can programmatically redirect the user around the app.
    // ex when the value of the signin changes. Its challenging to get the history when using browser router.
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* /auth route */}
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard" >
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy/>
                </Route>
              {/* rest of the route */}
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
