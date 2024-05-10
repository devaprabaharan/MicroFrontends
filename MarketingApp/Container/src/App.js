import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from "history";
import Progress from './Components/Progress';
import Header from "./Components/Header";
import { ErrorBoundary} from './ErrorBoundary';

//const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./Components/MarketingApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));


//unique randomly generated namespace so that css classnames will not collide with mfe's
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] =  useState({});
  
  //
  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  const authResult = (user) => {
    console.log(`inside container authResult: ${user}`)
    setUser(user);
    setIsSignedIn(true);
  }

  const logout = () =>{
    setUser({});
    setIsSignedIn(false);
  }


  return (
    // why not browser router. whenever we create a browser router that internally creates a browser history for us
    // we have to have access to that history instance so that we can programmatically redirect the user around the app.
    // ex when the value of the signin changes. Its challenging to get the history when using browser router.
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={logout} />
          <Suspense fallback={<Progress />}>
            <ErrorBoundary>
              <Switch>
                {/* /auth route */}
                {/* <Route path="/auth"><AuthLazy onSignIn={(user) => authResult(user)} /></Route> */}
                <Route path="/dashboard">{!isSignedIn && <Redirect to="/" />}<DashboardLazy /></Route>
                {/* rest of the route */}
                <Route path="/"><MarketingLazy/></Route> 
              </Switch>
              </ErrorBoundary>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
