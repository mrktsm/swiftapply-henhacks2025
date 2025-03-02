import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import JobApplicationDashboard from "./JobApplicationDashboard";
import SignInPage from "./SignInPage";
import FormPage from "./ProfileSetupForm";
import LandingPage from "./LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedForm, setHasCompletedForm] = useState(false);

  // Check if user has completed form in localStorage on component mount
  useState(() => {
    const formStatus = localStorage.getItem("hasCompletedForm");
    if (formStatus === "true") {
      setHasCompletedForm(true);
    }
  }, []);

  const handleFormCompletion = () => {
    setHasCompletedForm(true);
    localStorage.setItem("hasCompletedForm", "true");
  };

  return (
    <BrowserRouter>
      <div className="nano-sans-300">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                hasCompletedForm ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/profile-setup" replace />
                )
              ) : (
                <SignInPage onAuthSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* Form Route */}
          <Route
            path="/profile-setup"
            element={
              isAuthenticated ? (
                hasCompletedForm ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <FormPage onFormComplete={() => setHasCompletedForm(true)} />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                hasCompletedForm ? (
                  <JobApplicationDashboard />
                ) : (
                  <Navigate to="/profile-setup" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
