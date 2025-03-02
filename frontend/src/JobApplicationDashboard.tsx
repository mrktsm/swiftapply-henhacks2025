import React, { useEffect, useState } from "react";
import {
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  ChevronRight,
  ChevronDown,
  Filter,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Bell,
} from "lucide-react";
import ProgressCircle from "./components/ui/progressCircle";
import ConcentricProgressCircles from "./components/ui/ConcentricProgressCircles";

const JobApplicationDashboard = () => {
  const [expandedStats, setExpandedStats] = useState(false);
  const [loading, setLoading] = useState(false);

  const multipleRings = [
    {
      name: "move",
      percentage: 75, // 75% complete
      color: "gradient", // Will use the pink-to-red gradient
      icon: "\uF105", // FontAwesome icon code
    },
    {
      name: "exercise",
      percentage: 45, // 45% complete
      color: "#a0ff03", // Green color
      icon: "\uF101", // FontAwesome icon code
    },
    {
      name: "stand",
      percentage: 90, // 90% complete
      color: "#1ad5de", // Blue color
      icon: "\uF106", // FontAwesome icon code
    },
  ];

  // Simulate loading effect for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const positionTypeData = [
    { name: "Software Engineering", value: 42 },
    { name: "Data Science", value: 24 },
    { name: "Product Management", value: 18 },
    { name: "UI/UX Design", value: 12 },
    { name: "DevOps", value: 8 },
  ];

  const compatibilityData = [
    { name: "90-100%", count: 8 },
    { name: "80-89%", count: 16 },
    { name: "70-79%", count: 14 },
    { name: "60-69%", count: 11 },
    { name: "0-59%", count: 5 },
  ];

  const applicationData = [
    { name: "Mon", count: 12 },
    { name: "Tue", count: 18 },
    { name: "Wed", count: 15 },
    { name: "Thu", count: 22 },
    { name: "Fri", count: 20 },
    { name: "Sat", count: 8 },
    { name: "Sun", count: 5 },
  ];

  // Dark mode color palette
  const COLORS = [
    "#4ade80", // light green (primary)
    "#34C759", // green
    "#FF9500", // orange
    "#FF2D55", // pink
    "#AF52DE", // purple
    "#5856D6", // indigo
  ];

  // Mock applied jobs
  const appliedJobs = [
    {
      id: 1,
      title: "Software Engineering Summer Internship",
      company: "Rokt",
      location: "Seattle, WA",
      type: "Internship",
      salary: "45/hr",
      compatibility: 84,
      tags: ["Comp. & Benefits", "H1B Sponsor Likely"],
      applicants: "200+",
      posted: "19 hours ago",
      image:
        "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=contain,w=200,h=200,q=100/https://builtinseattle.com/sites/www.builtinseattle.com/files/2024-10/rlogo.jpg",
    },
    {
      id: 2,
      title: "Frontend Engineering Intern",
      company: "Stripe",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "52/hr",
      compatibility: 92,
      tags: ["Skills Match", "Culture Fit"],
      applicants: "340+",
      posted: "2 days ago",
      image:
        "https://media.licdn.com/dms/image/v2/D4E0BAQFqiwiSMcKk6A/company-logo_200_200/company-logo_200_200/0/1724937022726/stripe_logo?e=2147483647&v=beta&t=--CED0oRQUupcr1Q2MktzOErO8NMpjCjxa4-JiqrGzU",
    },
    {
      id: 3,
      title: "Software Development Intern",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Internship",
      salary: "50/hr",
      compatibility: 78,
      tags: ["Experience Match", "H1B Sponsor"],
      applicants: "500+",
      posted: "3 days ago",
      image:
        "https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
    },
  ];

  // Statistics
  const stats = {
    totalApplications: 54,
    averageCompatibility: 81.3,
    interviews: 8,
    offers: 2,
    highestCompatibility: 96,
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-200">
      {/* Header - iOS style navigation bar */}
      <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-medium bg-gradient-to-r text-white bg-clip-text">
            Job Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-700 transition-colors">
              <Bell size={20} />
            </button>
            <button className="bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white rounded-full py-2 px-6 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200">
              Apply to Jobs
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-4">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl shadow-sm border border-gray-700 overflow-hidden col-span-2 transform transition-transform duration-300 bg-gray-800">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-100 text-left">
                  Application Overview
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="relative mb-2">
                    <ProgressCircle
                      percentage={54}
                      radius={90}
                      strokeWidth={24}
                      isLoading={loading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-gray-100 comfortaa-300">
                      {stats.totalApplications}
                    </div>
                  </div>
                  <div className="text-gray-300 font-medium mt-2">
                    Total Applications
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 -mt-20 ">
                  <div className="relative mb-2">
                    <ConcentricProgressCircles
                      rings={multipleRings}
                      showLabels={false}
                    />
                  </div>
                  <div className="text-gray-300 font-medium -mt-25">
                    Interviews
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-2">
                    <ProgressCircle
                      percentage={50}
                      radius={60}
                      strokeWidth={15}
                      isLoading={loading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-gray-100 comfortaa-300">
                      {Math.round(stats.averageCompatibility)}
                    </div>
                  </div>
                  <div className="text-gray-300 font-medium">
                    Avg. Compatibility
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transform transition-transform duration-300 text-left h-full">
            <h2 className="text-xl font-medium mb-6 text-gray-100">
              Daily Applications
            </h2>
            <div className="h-[calc(100%-4rem)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={applicationData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FF0066" stopOpacity={1} />
                      <stop offset="100%" stopColor="#FF0033" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                    tick={{ fill: "#b3b3b3" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                    tick={{ fill: "#b3b3b3" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "9px",
                      backgroundColor: "#2d3748", // Dark background for tooltip
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      color: "#e2e8f0",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    barSize={35}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {applicationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fillOpacity={1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-100">Applied Jobs</h2>
          <div className="flex items-center">
            <button className="text-gray-300 hover:text-gray-100 flex items-center mr-4 py-2 px-4 rounded-full hover:bg-gray-800 transition-colors">
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
            <button className="text-gray-300 hover:text-gray-100 flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Sort by Date</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-4 flex"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-300 mr-4">
                {job.image ? (
                  <img
                    src={job.image}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-300 mr-4">
                    {job.company.slice(0, 1)}
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400">{job.posted}</span>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{job.company}</span>
                      <span className="mx-1">•</span>
                      <span>B2B • Big Data • Late Stage</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-4">
                      {job.applicants} applicants
                    </span>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full py-1 px-4 text-sm">
                      Applied
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <DollarSign size={16} className="mr-2" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="flex mt-4 items-center">
                  <div className="mr-4 flex flex-col items-center">
                    {/* Progress Circle */}
                    <ProgressCircle
                      percentage={job.compatibility}
                      radius={20}
                      strokeWidth={6}
                      isLoading={loading}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2 text-gray-200">
                      Match Factors
                    </div>
                    <div className="flex gap-2">
                      {job.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="bg-red-900 text-rose-200 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDashboard;
