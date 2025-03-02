import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JobApplicationDashboard from "./JobApplicationDashboard";
import SignInPage from "./SignInPage";

function App() {
  return (
    <div className="noto-500 text-center">
      {/* <JobApplicationDashboard />; */}
      <SignInPage />
    </div>
  );
}

export default App;
