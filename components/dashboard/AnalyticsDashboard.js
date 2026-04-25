"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MapPin, Clock, Users, Globe } from "lucide-react";
import { isGA4Configured } from "@/lib/ga4config";

const COLORS = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"];

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    activeUsers: 0,
    pageViews: 0,
    avgSessionDuration: 0,
    topLocations: [],
    deviceUsage: [],
    trafficSources: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!isGA4Configured()) {
          // If GA4 is not configured, use mock data
          const mockData = {
            activeUsers: 156,
            pageViews: 2847,
            avgSessionDuration: 165, // in minutes
            topLocations: [
              { name: "United States", value: 45 },
              { name: "United Kingdom", value: 25 },
              { name: "Germany", value: 15 },
              { name: "India", value: 10 },
              { name: "Others", value: 5 },
            ],
            deviceUsage: [
              { name: "Desktop", value: 60 },
              { name: "Mobile", value: 35 },
              { name: "Tablet", value: 5 },
            ],
            trafficSources: [
              { name: "Direct", value: 40 },
              { name: "Organic", value: 30 },
              { name: "Social", value: 20 },
              { name: "Referral", value: 10 },
            ],
          };
          setAnalyticsData(mockData);
        } else {
          // Fetch real GA4 data
          const response = await fetch("/api/analytics");
          if (!response.ok) {
            throw new Error("Failed to fetch analytics data");
          }
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Error loading analytics data: {error}
        </div>
      </div>
    );
  }

  // Format session duration
  const formatSessionDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.activeUsers}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-lg">
              <Globe className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Page Views</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.pageViews}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Session</p>
              <p className="text-2xl font-bold text-white">
                {formatSessionDuration(analyticsData.avgSessionDuration)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <MapPin className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Top Location</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.topLocations[0]?.name || "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">
            Location Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.topLocations}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={{ fill: "#fff" }}
                >
                  {analyticsData.topLocations.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Device Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">
            Device Usage
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.deviceUsage}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={{ fill: "#fff" }}
                >
                  {analyticsData.deviceUsage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{source.name}</span>
                  <span className="font-semibold text-white">
                    {source.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${source.value}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
