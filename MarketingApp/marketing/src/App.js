import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { StoreProvider } from "store/StoreApp";

// Create a theme instance.
const theme = createTheme({
  // You can customize your theme here.
});

const muiCache = createCache({
  key: "ma", // Your custom prefix
  prepend: true, // Prepends the styles to ensure they have higher specificity (useful in some scenarios)
});

function LocationDisplay() {
  const location = useLocation();
  console.log(
    "marketing: appjs location display: Current path inside marketing sub app:",
    location.pathname
  ); // This will log the path to console on every update
  return null; // This component doesn't render anything
}

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CacheProvider value={muiCache}>
          <Router>
            <LocationDisplay />
            <Routes>
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </Router>
        </CacheProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
