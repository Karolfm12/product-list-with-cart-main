import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

//reset import syles
import "./reset.css";

//app.css
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
