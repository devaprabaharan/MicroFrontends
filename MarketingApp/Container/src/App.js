import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import Header from "./Components/Header";
import Progress from "./Components/Progress";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const AuthLazy = lazy(() => import("./Components/AuthApp"));
const MarketingLazy = lazy(() => import("./Components/MarketingApp"));
const DashboardLazy = lazy(() => import("./Components/DashboardApp"));

const theme = createTheme();
const muiCache = createCache({ key: "co", prepend: true });

function SignInOutController() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate(); // Correctly placed within the Router context

  const handleSignIn = () => {
    console.log("Signing in");
    setIsSignedIn(true);
    navigate("/dashboard", { replace: true });
  };

  const handleSignOut = () => {
    console.log("Signing out");
    setIsSignedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <Header isSignedIn={isSignedIn} onSignIn={handleSignIn} onSignOut={handleSignOut} />
  );
}

function LocationDisplay() {
  const location = useLocation();
  console.log("container: appjs: Current path:", location.pathname); // This will log the path to console on every update
  return null; // This component doesn't render anything
}

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CacheProvider value={muiCache}>
          <LocationDisplay />
          <SignInOutController />
          <Suspense fallback={<Progress />}>
            <Routes>
              <Route path="/auth/*" element={<AuthLazy />} />
              <Route path="/dashboard" element={<DashboardLazy />} />
              <Route path="/" element={<MarketingLazy />} />
            </Routes>
          </Suspense>
        </CacheProvider>
      </ThemeProvider>
    </Router>
  );
}
