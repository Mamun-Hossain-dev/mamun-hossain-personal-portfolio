"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlogForm from "@/components/dashboard/BlogForm";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Trash2, Pencil, Plus, Eye, Search, Filter, Globe } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterPublished, setFilterPublished] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort by createdAt descending
      blogsData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });
      setBlogs(blogsData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blog posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      try {
        await deleteDoc(doc(db, "blogs", blog.id));
        fetchBlogs();
      } catch (err) {
        console.error("Error deleting blog:", err);
        setError("Failed to delete blog post.");
      }
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedBlog(null);
  };

  const handleFormSuccess = () => {
    fetchBlogs();
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      filterLanguage === "all" || blog.language === filterLanguage;

    const matchesPublished =
      filterPublished === "all" ||
      (filterPublished === "published" && blog.published) ||
      (filterPublished === "draft" && !blog.published);

    return matchesSearch && matchesLanguage && matchesPublished;
  });

  const getLanguageBadge = (language) => {
    switch (language) {
      case "english":
        return { label: "EN", color: "bg-[#2997FF]/10 text-[#2997FF]" };
      case "bangla":
        return { label: "বাংলা", color: "bg-green-500/10 text-green-400" };
      case "both":
        return { label: "EN/বাংলা", color: "bg-purple-500/10 text-purple-400" };
      default:
        return { label: "EN", color: "bg-[#2997FF]/10 text-[#2997FF]" };
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.03em] text-[#F5F5F7]">
          Blog Posts
        </h1>
        <p className="mt-2 text-[#86868B] text-[15px]">
          Manage your blog content — write in English, Bengali, or both
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full rounded-[980px] border border-white/[0.08] bg-[#1C1C1E] pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder:text-[#86868B] focus:border-white/20 focus:outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="rounded-[980px] border border-white/[0.08] bg-[#1C1C1E] px-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none transition-all"
          >
            <option value="all">All Languages</option>
            <option value="english">English</option>
            <option value="bangla">বাংলা</option>
            <option value="both">Both</option>
          </select>
          <select
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="rounded-[980px] border border-white/[0.08] bg-[#1C1C1E] px-3 py-2.5 text-sm text-[#F5F5F7] focus:outline-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button
            onClick={() => {
              setSelectedBlog(null);
              setShowForm(true);
            }}
            className="rounded-[980px] bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-white/90 shadow-sm"
          >
            <Plus size={16} className="inline mr-1.5" />
            New Post
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      ) : (
        <>
          {/* Blog Posts Grid / Table */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-[#F5F5F7] mb-2">No blog posts yet</h3>
              <p className="text-[#86868B] mb-6">Create your first blog post to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="rounded-[980px] bg-white px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-white/90"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredBlogs.map((blog, index) => {
                const lang = getLanguageBadge(blog.language);
                return (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, ease: appleEase }}
                    className="group rounded-2xl border border-white/[0.06] bg-[#1C1C1E] p-4 transition-all duration-200 hover:border-white/10 hover:bg-[#222224]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${lang.color}`}>
                            {lang.label}
                          </span>
                          {blog.category && (
                            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-[#86868B]">
                              {blog.category}
                            </span>
                          )}
                          {!blog.published && (
                            <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[11px] text-yellow-400">
                              Draft
                            </span>
                          )}
                          <span className="text-[11px] text-[#86868B]">
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#F5F5F7] truncate">
                          {blog.title}
                        </h3>
                        {blog.titleBn && (
                          <p className="text-[13px] text-[#86868B] mt-0.5" dir="auto">
                            {blog.titleBn}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[12px] text-[#86868B]">
                            {blog.readingTime || "5"} min read
                          </span>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex gap-1.5">
                              {blog.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] text-[#6B6B70]"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-[11px] text-[#6B6B70]">
                                  +{blog.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/blog/${blog.slug || blog.id}`}
                          target="_blank"
                          className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
                          title="Preview"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog)}
                          className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          blog={selectedBlog}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}