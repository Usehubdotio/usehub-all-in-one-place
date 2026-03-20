import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import App from "./App.jsx";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import "./index.css";

// eslint-disable-next-line react-refresh/only-export-components
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
