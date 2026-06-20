"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { ArrowRight, Clock } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.published)
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB - dateA;
        })
        .slice(0, 3);
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    } finally {
      setLoading(false);
    }
  };

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
    switch (language) {
      case "english":
        return { label: "EN", color: "bg-white/[0.08] text-[#A1A1A6]" };
      case "bangla":
        return { label: "বাংলা", color: "bg-white/[0.08] text-[#A1A1A6]" };
      case "both":
        return { label: "EN / বাংলা", color: "bg-white/[0.08] text-[#A1A1A6]" };
      default:
        return { label: "EN", color: "bg-white/[0.08] text-[#A1A1A6]" };
    }
  };

  return (
    <section className="border-t border-white/[0.06] bg-[#000000] py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B70]">
            Blog
          </p>
          <h2 className="max-w-3xl mx-auto text-[clamp(36px,5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#F5F5F7]">
            Insights from engineering and production systems.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-[16px] leading-[1.7] text-[#6B6B70]">
            Thoughts on backend engineering, system design, DevOps, and building
            production-ready software. Written in English and Bengali.
          </p>
        </motion.div>

        {/* Blog Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.06] bg-[#0a0a0a] p-16 text-center">
            <p className="text-[#6B6B70] text-[15px]">
              Articles coming soon. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {blogs.map((blog, index) => {
              const lang = getLanguageBadge(blog.language);
              return (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: appleEase,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Link href={`/blog/${blog.slug || blog.id}`}>
                    <div className="group relative h-full rounded-3xl border border-white/[0.06] bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0d0d0d]">
                      {/* Cover Image */}
                      {blog.coverImage && (
                        <div className="mb-4 overflow-hidden rounded-2xl">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Meta */}
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${lang.color}`}
                        >
                          {lang.label}
                        </span>
                        {blog.category && (
                          <span className="inline-flex items-center rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-[#6B6B70]">
                            {blog.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] text-[#6B6B70]">
                          <Clock size={10} />
                          {blog.readingTime || 5} min
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[16px] font-semibold text-[#F5F5F7] transition-colors group-hover:text-white line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      {blog.titleBn && (
                        <p className="mt-1 text-[13px] text-[#6B6B70] line-clamp-1" dir="auto">
                          {blog.titleBn}
                        </p>
                      )}

                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="mt-2 text-[13px] leading-[1.5] text-[#86868B] line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}

                      {/* Date */}
                      <p className="mt-4 text-[11px] text-[#6B6B70]">
                        {formatDate(blog.createdAt)}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[14px] font-medium text-[#F5F5F7] transition-all hover:bg-white/[0.04]"
          >
            <span>View all articles</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSection;