"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/dashboard/StatCard";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    blogs: 0,
    publishedBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const blogsSnapshot = await getDocs(collection(db, "blogs"));

        const allBlogs = blogsSnapshot.docs.map((doc) => doc.data());
        const publishedBlogs = allBlogs.filter((b) => b.published).length;

        setStats({
          users: usersSnapshot.size,
          projects: projectsSnapshot.size,
          blogs: blogsSnapshot.size,
          publishedBlogs,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div>
        <h1 className="text-[clamp(28px,3vw,36px)] font-bold tracking-[-0.02em] text-[#F5F5F7] mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/blogs">
            <StatCard
              title="Blog Posts"
              value={stats.blogs}
              description={`${stats.publishedBlogs} published, ${stats.blogs - stats.publishedBlogs} drafts`}
              icon="📝"
            />
          </Link>
          <Link href="/dashboard/projects">
            <StatCard
              title="Projects"
              value={stats.projects}
              description="Uploaded projects"
              icon="🗂️"
            />
          </Link>
          <StatCard
            title="Total Users"
            value={stats.users}
            description="Registered users"
            icon="👥"
          />
          <StatCard
            title="Analytics"
            value="Live"
            description="Real-time insights"
            icon="📊"
          />
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div>
        <h2 className="text-[clamp(22px,2.5vw,28px)] font-semibold tracking-[-0.02em] text-[#F5F5F7] mb-6">
          Analytics
        </h2>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}