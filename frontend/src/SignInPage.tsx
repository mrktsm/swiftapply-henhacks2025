import React, { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

// Add proper typing for the credential response
interface GoogleCredentialResponse {
  credential: string;
}

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication - replace with your actual auth logic
    setTimeout(() => {
      if (email && password) {
        // Success - redirect would happen here in a real app
        console.log("Signed in with:", email);
      } else {
        setError("Please enter both email and password");
      }
      setLoading(false);
    }, 1500);
  };

  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.");
  };

  const handleGoogleSuccess = (
    credentialResponse: GoogleCredentialResponse
  ) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user info:", decoded);

    // Here you would:
    // 1. Send the credential to your backend
    // 2. Handle authentication in your system
    // 3. Store tokens and redirect user
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center text-gray-200 p-4">
      <div className="w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-rose-600 to-red-500 mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Job Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Sign in to manage your applications
          </p>
        </div>

        {/* Sign in form */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center text-red-200">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailSignIn}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200 placeholder-gray-400"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-rose-400 hover:text-rose-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Sign in with Email
            </button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_black"
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-rose-400 hover:text-rose-300 font-medium"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import this component to use it
const Briefcase = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
};

export default SignInPage;
