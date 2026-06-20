"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc, collection, Timestamp, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { X, Save, Globe, FileText, Tag, Eye } from "lucide-react";
import TiptapEditor from "./TiptapEditor";

const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

const languageOptions = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "bangla", label: "বাংলা", flag: "🇧🇩" },
  { value: "both", label: "English & বাংলা", flag: "🌐" },
];

const categoryOptions = [
  "DevOps",
  "System Design",
  "Backend Engineering",
  "Frontend",
  "Career",
  "Tutorial",
  "Open Source",
  "Database",
  "Docker",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Bengali Tech",
];

export default function BlogForm({ blog, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    titleBn: "",
    slug: "",
    excerpt: "",
    excerptBn: "",
    contentEn: "",
    contentBn: "",
    category: "",
    tags: "",
    language: "english",
    coverImage: "",
    readingTime: 5,
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        titleBn: blog.titleBn || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        excerptBn: blog.excerptBn || "",
        contentEn: blog.contentEn || "",
        contentBn: blog.contentBn || "",
        category: blog.category || "",
        tags: blog.tags ? (Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags) : "",
        language: blog.language || "english",
        coverImage: blog.coverImage || "",
        readingTime: blog.readingTime || 5,
        published: blog.published || false,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: blog ? prev.slug : generateSlug(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }

      if (!formData.slug.trim()) {
        setError("Slug is required");
        setLoading(false);
        return;
      }

      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const blogData = {
        title: formData.title,
        titleBn: formData.titleBn || "",
        slug: formData.slug,
        excerpt: formData.excerpt || "",
        excerptBn: formData.excerptBn || "",
        contentEn: formData.contentEn || "",
        contentBn: formData.contentBn || "",
        category: formData.category,
        tags: tagsArray,
        language: formData.language,
        coverImage: formData.coverImage || "",
        readingTime: parseInt(formData.readingTime) || 5,
        published: formData.published,
        updatedAt: Timestamp.now(),
        createdAt: blog?.createdAt || Timestamp.now(),
      };

      if (blog) {
        await setDoc(doc(db, "blogs", blog.id), blogData, { merge: true });
      } else {
        const uniqueId = generateUniqueId();
        blogData.createdAt = Timestamp.now();
        await setDoc(doc(db, "blogs", uniqueId), blogData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving blog:", error);
      setError("Failed to save blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateReadingTime = (html) => {
    const text = html ? html.replace(/<[^>]*>/g, "") : "";
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-4xl rounded-[28px] border border-white/[0.08] bg-[#1C1C1E] shadow-[0_40px_80px_rgba(0,0,0,0.5)] mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-[#F5F5F7]">
              {blog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <p className="text-sm text-[#86868B] mt-1">
              Write in English, Bengali, or both
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="rounded-[980px] border border-white/15 bg-white/5 px-4 py-2 text-sm text-[#F5F5F7] transition-all hover:bg-white/10"
            >
              <Eye size={16} className="inline mr-1.5" />
              {previewMode ? "Edit" : "Preview"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Language & Publish */}
          <div className="flex flex-wrap gap-4 items-start justify-between">
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, language: lang.value }))
                  }
                  className={`rounded-[980px] px-4 py-2 text-sm font-medium transition-all ${
                    formData.language === lang.value
                      ? "bg-white text-[#0a0a0a] shadow-sm"
                      : "border border-white/15 text-[#86868B] hover:bg-white/5 hover:text-[#F5F5F7]"
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-sm text-[#86868B]">Published</span>
              <div className="relative">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-11 rounded-full transition-colors ${
                    formData.published ? "bg-[#2997FF]" : "bg-[#2C2C2E]"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      formData.published ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* English Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <Globe size={14} className="inline mr-1.5" />
                Title (English)
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Building a Redis Cache-Aside Layer"
                className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
                required
              />
            </div>

            {/* Bengali Title */}
            {(formData.language === "bangla" || formData.language === "both") && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                  <Globe size={14} className="inline mr-1.5" />
                  শিরোনাম (বাংলা)
                </label>
                <input
                  type="text"
                  name="titleBn"
                  value={formData.titleBn}
                  onChange={handleChange}
                  placeholder="যেমন: রেডিস ক্যাশ-অ্যাসাইড লেয়ার তৈরি করা"
                  className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
                  dir="auto"
                />
              </div>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
              <span className="text-white/30 mr-1">/</span> Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/30">/blog/</span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="building-redis-cache-aside-layer"
                className="flex-1 rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all"
                required
              />
            </div>
          </div>

          {/* Excerpts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <FileText size={14} className="inline mr-1.5" />
                Excerpt (English)
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Brief summary of your blog post..."
                className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all resize-none"
              />
            </div>
            {(formData.language === "bangla" || formData.language === "both") && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                  <FileText size={14} className="inline mr-1.5" />
                  সারসংক্ষেপ (বাংলা)
                </label>
                <textarea
                  name="excerptBn"
                  value={formData.excerptBn}
                  onChange={handleChange}
                  rows={3}
                  placeholder="আপনার ব্লগ পোস্টের সংক্ষিপ্ত বিবরণ..."
                  className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition-all resize-none"
                  dir="auto"
                />
              </div>
            )}
          </div>

          {/* Content Editors - only show relevant ones */}
          {(formData.language === "english" || formData.language === "both") && (
            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <FileText size={14} className="inline mr-1.5" />
                Content (English) — Rich Text Editor
              </label>
              <TiptapEditor
                content={formData.contentEn}
                onChange={(html) =>
                  setFormData((prev) => ({
                    ...prev,
                    contentEn: html,
                    readingTime: calculateReadingTime(html),
                  }))
                }
                placeholder="Start writing your blog post in English... Use / for formatting commands"
              />
            </div>
          )}

          {(formData.language === "bangla" || formData.language === "both") && (
            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <FileText size={14} className="inline mr-1.5" />
                কন্টেন্ট (বাংলা) — Rich Text Editor
              </label>
              <TiptapEditor
                content={formData.contentBn}
                onChange={(html) =>
                  setFormData((prev) => ({
                    ...prev,
                    contentBn: html,
                    readingTime: calculateReadingTime(html),
                  }))
                }
                placeholder="আপনার ব্লগ পোস্ট লিখুন... ফরম্যাটিং কমান্ডের জন্য / ব্যবহার করুন"
              />
            </div>
          )}

          {/* Meta fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <span className="mr-1">📂</span> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] focus:border-white/20 focus:outline-none transition-all"
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <span className="mr-1">📷</span> Cover Image URL
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
                <span className="mr-1">⏱️</span> Reading Time (min)
              </label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                min={1}
                className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] focus:border-white/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#A1A1A6]">
              <Tag size={14} className="inline mr-1.5" />
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. redis, caching, performance, backend"
              className="w-full rounded-2xl border border-white/[0.12] bg-[#2C2C2E] px-4 py-3 text-[#F5F5F7] placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-all"
            />
          </div>

          {/* Preview Mode */}
          {previewMode && (
            <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-6">
              <h3 className="text-lg font-bold text-[#F5F5F7] mb-4">Preview</h3>
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold text-[#F5F5F7]">
                  {formData.title || "Untitled"}
                </h1>
                {formData.titleBn && (
                  <h2 className="text-2xl font-bold text-[#F5F5F7] mt-2" dir="auto">
                    {formData.titleBn}
                  </h2>
                )}
                <div className="flex gap-2 my-4">
                  {formData.category && (
                    <span className="rounded-full bg-[#2997FF]/10 px-3 py-1 text-xs text-[#2997FF]">
                      {formData.category}
                    </span>
                  )}
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#86868B]">
                    {formData.readingTime} min read
                  </span>
                </div>
                <div
                  className="text-[#C7C7CC] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formData.contentEn }}
                />
                {formData.contentBn && (
                  <div
                    className="text-[#C7C7CC] leading-relaxed mt-6 pt-6 border-t border-white/[0.08]"
                    dir="auto"
                    dangerouslySetInnerHTML={{ __html: formData.contentBn }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
            <div className="flex items-center gap-2 text-sm text-[#86868B]">
              <div className="h-2 w-2 rounded-full bg-[#2997FF]" />
              <span>
                Status:{" "}
                <span className={formData.published ? "text-green-400" : "text-[#86868B]"}>
                  {formData.published ? "Published" : "Draft"}
                </span>
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-[980px] border border-white/15 px-6 py-2.5 text-sm text-[#86868B] transition-all hover:bg-white/5 hover:text-[#F5F5F7] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-[980px] bg-white px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-white/90 disabled:opacity-50 shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a] border-t-transparent" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={16} />
                    {blog ? "Update Post" : "Publish Post"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}