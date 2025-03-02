import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import JobApplicationDashboard from "./JobApplicationDashboard";
import SignInPage from "./SignInPage";
import FormPage from "./FormPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    // <BrowserRouter>
    //   <div className="noto-500">
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           isAuthenticated ? (
    //             <Navigate to="/dashboard" replace />
    //           ) : (
    //             <SignInPage onAuthSuccess={() => setIsAuthenticated(true)} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/dashboard"
    //         element={
    //           isAuthenticated ? (
    //             <JobApplicationDashboard />
    //           ) : (
    //             <Navigate to="/" replace />
    //           )
    //         }
    //       />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
    <FormPage />
  );
}

export default App;
