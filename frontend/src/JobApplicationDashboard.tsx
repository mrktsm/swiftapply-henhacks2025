import React, { useEffect, useState } from "react";
import {
  PieChart,
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

const JobApplicationDashboard = () => {
  const [expandedStats, setExpandedStats] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const locationData = [
    { name: "Seattle", count: 28 },
    { name: "Remote", count: 22 },
    { name: "SF Bay Area", count: 17 },
    { name: "New York", count: 12 },
    { name: "Austin", count: 7 },
    { name: "Other", count: 14 },
  ];

  // Light green-inspired color palette
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
      salary: "$45/hr",
      compatibility: 84,
      tags: ["Comp. & Benefits", "H1B Sponsor Likely"],
      applicants: "200+",
      posted: "19 hours ago",
    },
    {
      id: 2,
      title: "Frontend Engineering Intern",
      company: "Stripe",
      location: "San Francisco, CA",
      type: "Internship",
      salary: "$52/hr",
      compatibility: 92,
      tags: ["Skills Match", "Culture Fit"],
      applicants: "340+",
      posted: "2 days ago",
    },
    {
      id: 3,
      title: "Software Development Intern",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Internship",
      salary: "$50/hr",
      compatibility: 78,
      tags: ["Experience Match", "H1B Sponsor"],
      applicants: "500+",
      posted: "3 days ago",
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
    <div
      className="bg-gray-50 min-h-screen"
      style={{
        fontFamily:
          "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header - iOS style navigation bar */}
      <header className="bg-white bg-opacity-70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            Job Tracker
          </h1>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={20} />
            </button>
            <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full py-2 px-6 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200">
              Apply to Jobs
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden col-span-2 transform transition-transform hover:scale-[1.01] duration-300">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Application Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative mb-2">
                    <ProgressCircle
                      percentage={Math.round(
                        (stats.totalApplications / 100) * 100
                      )}
                      radius={60}
                      strokeWidth={12}
                      isLoading={loading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-gray-800">
                      {stats.totalApplications}
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium">
                    Total Applications
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative mb-2">
                    <ProgressCircle
                      percentage={Math.round(stats.averageCompatibility)}
                      radius={40}
                      strokeWidth={8}
                      isLoading={loading}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-gray-800">
                      {Math.round(stats.averageCompatibility)}
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium">
                    Avg. Compatibility
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative mb-2">
                    <ProgressCircle
                      percentage={Math.round(
                        (stats.interviews / stats.totalApplications) * 100
                      )}
                      radius={40}
                      strokeWidth={8}
                      isLoading={loading}
                      color="#8B5CF6"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-gray-800">
                      {stats.interviews}
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium">Interviews</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transform transition-transform hover:scale-[1.01] duration-300">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Top Locations
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={locationData}
                layout="vertical"
                barCategoryGap={12}
              >
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={80}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[0, 4, 4, 0]}
                  fill="#4ade80"
                  background={{ fill: "#f5f5f7" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Applied Jobs</h2>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 flex items-center mr-4 py-2 px-4 rounded-full hover:bg-white transition-colors">
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700 flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Sort by Date</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex"
            >
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 mr-4">
                {job.company.slice(0, 1)}
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400">{job.posted}</span>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{job.company}</span>
                      <span className="mx-1">•</span>
                      <span>B2B • Big Data • Late Stage</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-4">
                      {job.applicants} applicants
                    </span>
                    <button className="bg-red-500 hover:bg-red-600 text-white rounded-full py-1 px-4 text-sm">
                      Applied
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign size={16} className="mr-2" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="flex mt-4 items-center">
                  <div className="mr-4">
                    {/* Replace ProgressRing with D3 ProgressCircle */}
                    <ProgressCircle
                      percentage={job.compatibility}
                      radius={25}
                      strokeWidth={5}
                      isLoading={loading}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">
                      Match Factors
                    </div>
                    <div className="flex gap-2">
                      {job.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
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
