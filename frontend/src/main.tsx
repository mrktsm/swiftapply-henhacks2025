import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";

const googleClientId =
  "8800310716-hb9ob9ppdn9pj1ju3ecf8q5h6ffc0ptc.apps.googleusercontent.com"; // TODO: Put this in an environment variable

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
