import React from "react";
import { Search, Bell, ChevronRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-gray-200 relative">
      {/* Complex gradient background - balanced pink and red */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-red-400 to-red-500 -z-10"></div>

      {/* Radial overlay for more complexity - subtle pink and red mix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,99,132,0.4),transparent_70%)] -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,64,129,0.45),transparent_70%)] -z-10"></div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')] -z-10"></div>

      {/* Header - Navigation bar with blur effect */}
      <header className="bg-gray-800 bg-opacity-30 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl text-white font-thin">
            <div className="flex justify-between items-center">
              <div className="flex justify-between">
                <img src="red bird.svg" className="h-[32px] mr-2" />
                <img
                  src="red_tittle.png"
                  className="h-[30px] mt-[2.5px] mr-2"
                />{" "}
                |
              </div>
              <span className="mt-1 ml-2 border-pink-800/50 pl-2">
                AI Job Agent
              </span>
            </div>
          </h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-pink-100 hover:bg-pink-900/30 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full text-pink-100 hover:bg-pink-900/30 transition-colors">
              <Bell size={20} />
            </button>
            <button className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white rounded-full py-2 px-6 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
              Sign Up For Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            AI Agent Applies to Jobs For You
          </h1>
          <p className="text-lg md:text-xl text-pink-100 mb-8">
            Reclaim hours of your life with our AI job application agent. It
            automatically finds and applies to relevant positions while you
            focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white rounded-full py-3 px-8 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
              Save Time Now
            </button>
            <button className="bg-gray-900/30 backdrop-blur-sm border border-pink-500/30 hover:bg-pink-900/30 text-white rounded-full py-3 px-8 font-medium text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer">
              See How It Works <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Screenshot */}
        <div className="w-full max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/30 to-pink-600/30 rounded-2xl blur-xl opacity-70 -z-10"></div>
          <div className="bg-gray-900/40 backdrop-blur-sm border border-pink-500/20 rounded-2xl shadow-2xl overflow-hidden">
            <img
              src="demo.png"
              alt="AI Job Application Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Automated Applications
            </h3>
            <p className="text-pink-100/80">
              Our AI agent automatically finds and applies to relevant jobs,
              saving you countless hours of manual searching.
            </p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Real-time Updates
            </h3>
            <p className="text-pink-100/80">
              Receive instant notifications when your AI agent secures
              interviews, cutting your job search time in half.
            </p>
          </div>
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChevronRight size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Time-Saving Analytics
            </h3>
            <p className="text-pink-100/80">
              Gain insights without effort as our AI analyzes application
              performance, saving you hours of strategic planning.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900/50 backdrop-blur-sm py-16 mt-16 border-t border-pink-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to let AI handle your job search?
          </h2>
          <p className="text-pink-100/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who save 20+ hours weekly by letting
            our AI agent apply to jobs while they focus on interview prep.
          </p>
          <button className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white rounded-full py-3 px-8 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Start Saving Time Today
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/70 backdrop-blur-sm py-8 border-t border-pink-900/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0"></div>
            <p className="text-center text-white text-sm">
              Made for Henhacks 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
