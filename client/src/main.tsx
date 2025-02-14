import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import PiwikPro from "@piwikpro/react-piwik-pro";

PiwikPro.initialize(
  "ee12ca8a-8777-46a9-8a15-d41ecca86365",
  "https://ogreden.piwik.pro"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
