"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Search, Clock, ArrowRight } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "devops", label: "DevOps" },
  { value: "system design", label: "System Design" },
  { value: "backend engineering", label: "Backend" },
  { value: "frontend", label: "Frontend" },
  { value: "career", label: "Career" },
  { value: "tutorial", label: "Tutorial" },
  { value: "database", label: "Database" },
  { value: "docker", label: "Docker" },
  { value: "bengali tech", label: "বাংলা টেক" },
];

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.published)
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB - dateA;
        });
      setBlogs(blogsData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.titleBn?.includes(searchQuery) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || blog.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageBadge = (language) => {
    const base = "bg-white/[0.08] text-[#A1A1A6]";
    return { label: language === "bangla" ? "বাংলা" : language === "both" ? "EN / বাংলা" : "EN", color: base };
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative border-b border-white/[0.06] bg-[#000000] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEase }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B70] mb-5">
              Blog
            </p>
            <h1 className="text-[clamp(40px,7vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F5F5F7]">
              Insights on Engineering & DevOps
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-[#6B6B70] max-w-2xl mx-auto">
              Thoughts on backend engineering, system design, DevOps, and
              building production-ready software. Available in English and Bengali.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: appleEase }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative mb-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B70]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-white/[0.08] bg-[#0a0a0a] py-3.5 pl-12 pr-4 text-[15px] text-[#F5F5F7] placeholder:text-[#6B6B70] focus:border-white/[0.15] focus:outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-white/[0.08] bg-[#0a0a0a] px-4 py-2 text-sm text-[#F5F5F7] focus:outline-none transition-all"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="rounded-full border border-white/[0.08] bg-[#0a0a0a] px-4 py-2 text-sm text-[#F5F5F7] focus:outline-none transition-all"
              >
                <option value="all">All Languages</option>
                <option value="english">English</option>
                <option value="bangla">বাংলা</option>
                <option value="both">Both</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog List */}
      <section className="bg-[#000000] py-20">
        <div className="mx-auto max-w-4xl px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-[#F5F5F7] mb-2">No articles found</h3>
              <p className="text-[#6B6B70]">
                {searchQuery ? "Try adjusting your search or filters" : "Articles are coming soon. Stay tuned!"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map((blog, index) => {
                const lang = getLanguageBadge(blog.language);
                return (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, ease: appleEase }}
                  >
                    <Link href={`/blog/${blog.slug || blog.id}`}>
                      <div className="group relative rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0d0d0d] sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${lang.color}`}>{lang.label}</span>
                              {blog.category && (
                                <span className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-[#6B6B70]">{blog.category}</span>
                              )}
                              <span className="flex items-center gap-1 text-[12px] text-[#6B6B70]">
                                <Clock size={12} />
                                {blog.readingTime || 5} min read
                              </span>
                              <span className="text-[12px] text-[#6B6B70]">{formatDate(blog.createdAt)}</span>
                            </div>
                            <h2 className="text-xl font-bold text-[#F5F5F7] transition-colors group-hover:text-white sm:text-2xl">{blog.title}</h2>
                            {blog.titleBn && <p className="mt-1 text-base text-[#6B6B70]" dir="auto">{blog.titleBn}</p>}
                            {blog.excerpt && <p className="mt-3 text-[15px] leading-[1.6] text-[#86868B] line-clamp-2">{blog.excerpt}</p>}
                            {blog.tags && blog.tags.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {blog.tags.slice(0, 4).map((tag) => (
                                  <span key={tag} className="rounded-full bg-white/[0.03] px-3 py-1 text-[11px] text-[#6B6B70]">#{tag}</span>
                                ))}
                              </div>
                            )}
                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#F5F5F7] opacity-0 transition-all group-hover:opacity-100">
                              <span>Read article</span>
                              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                          {blog.coverImage && (
                            <div className="flex-shrink-0">
                              <div className="relative h-24 w-36 overflow-hidden rounded-xl sm:h-32 sm:w-48">
                                <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}