import React, { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

// Add proper typing for the credential response
interface GoogleCredentialResponse {
  credential: string;
}

// Custom Google Button wrapper component
const StyledGoogleButton = ({
  onSuccess,
  onError,
}: {
  onSuccess: (response: GoogleCredentialResponse) => void;
  onError: () => void;
}) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-red-500 group-hover:from-rose-500 group-hover:to-red-400 text-white font-medium rounded-lg shadow-md group-hover:shadow-lg transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
      <div className="absolute inset-0 opacity-0 hover:cursor-pointer">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          theme="filled_black"
          text="signin_with"
          shape="rectangular"
          width="100%"
        />
      </div>
    </div>
  );
};

const SignInPage = ({ onAuthSuccess }: SignInPageProps) => {
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
    onAuthSuccess();
    localStorage.setItem("userToken", credentialResponse.credential);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center text-gray-200 p-4">
      <div className="w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8 justify-center items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-rose-600 to-red-500 mb-4">
            <img src="white bird.svg" className="w-9 h-9 text-white" />
          </div>
          <img src="red_tittle.png" className="h-12 mx-auto" />
          {/* <h1 className="text-3xl font-bold text-white">Job Dashboard</h1> */}

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

          <div className="mt-6 hover:cursor-pointer group">
            <StyledGoogleButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
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

export default SignInPage;
