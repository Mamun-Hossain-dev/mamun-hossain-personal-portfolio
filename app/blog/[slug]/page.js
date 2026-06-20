"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("en");

  useEffect(() => {
    if (slug) fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const blogData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        setBlog(blogData);
        setActiveTab(blogData.language === "bangla" ? "bn" : "en");
        fetchRelatedBlogs(blogData);
      } else {
        const docRef = doc(db, "blogs", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const blogData = { id: docSnap.id, ...docSnap.data() };
          setBlog(blogData);
          setActiveTab(blogData.language === "bangla" ? "bn" : "en");
          fetchRelatedBlogs(blogData);
        } else {
          setBlog(null);
        }
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (currentBlog) => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const allBlogs = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((b) => b.id !== currentBlog.id && b.published && b.slug !== currentBlog.slug)
        .slice(0, 3);
      setRelatedBlogs(allBlogs);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-[#86868B] hover:text-[#F5F5F7] transition-all">← Back to all articles</Link>
        </div>
      </div>
    );
  }

  const tabContent = {
    en: { title: blog.title, content: blog.contentEn, excerpt: blog.excerpt },
    bn: { title: blog.titleBn || blog.title, content: blog.contentBn || blog.contentEn, excerpt: blog.excerptBn || blog.excerpt },
  };
  const currentContent = tabContent[activeTab] || tabContent.en;

  return (
    <>
      <div className="bg-[#000000] pt-28 pb-4">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#6B6B70] transition-colors hover:text-[#F5F5F7]">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>

      <article className="bg-[#000000]">
        <div className="mx-auto max-w-3xl px-6 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: appleEase }}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {blog.category && (
                <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-[#A1A1A6]">{blog.category}</span>
              )}
              <span className="flex items-center gap-1 text-xs text-[#6B6B70]"><Calendar size={12} />{formatDate(blog.createdAt)}</span>
              <span className="flex items-center gap-1 text-xs text-[#6B6B70]"><Clock size={12} />{blog.readingTime || 5} min read</span>
            </div>
            <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.03em] text-[#F5F5F7]">{blog.title}</h1>
            {blog.titleBn && activeTab === "bn" && <p className="mt-3 text-2xl text-[#6B6B70]" dir="auto">{blog.titleBn}</p>}

            {blog.language === "both" && (
              <div className="mt-6 flex gap-2">
                <button onClick={() => setActiveTab("en")} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === "en" ? "bg-white text-[#000000]" : "border border-white/15 text-[#86868B] hover:bg-white/5"}`}>🇬🇧 English</button>
                <button onClick={() => setActiveTab("bn")} className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === "bn" ? "bg-white text-[#000000]" : "border border-white/15 text-[#86868B] hover:bg-white/5"}`}>🇧🇩 বাংলা</button>
              </div>
            )}

            {blog.coverImage && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.06]">
                <img src={blog.coverImage} alt={blog.title} className="w-full object-cover" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}>
            {currentContent.excerpt && (
              <p className="mb-8 text-lg leading-relaxed text-[#86868B] border-l-2 border-white/20 pl-6">{currentContent.excerpt}</p>
            )}
            <div className="blog-content" dir={activeTab === "bn" ? "auto" : "ltr"} dangerouslySetInnerHTML={{ __html: currentContent.content || "" }} />
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-[#6B6B70]">#{tag}</span>)}
                </div>
              </div>
            )}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-[#6B6B70]">Share this article:</span>
              <button
                onClick={() => {
                  if (navigator.share) navigator.share({ title: blog.title, url: window.location.href });
                  else navigator.clipboard.writeText(window.location.href);
                }}
                className="rounded-full border border-white/15 p-2 text-[#6B6B70] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
              >
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </article>

      {relatedBlogs.length > 0 && (
        <section className="border-t border-white/[0.06] bg-[#000000] py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-[#F5F5F7] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedBlogs.map((related, index) => (
                <motion.div key={related.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, ease: appleEase }}>
                  <Link href={`/blog/${related.slug || related.id}`}>
                    <div className="group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#0d0d0d]">
                      <h3 className="text-[15px] font-semibold text-[#F5F5F7] group-hover:text-white transition-colors line-clamp-2">{related.title}</h3>
                      <p className="mt-1 text-xs text-[#6B6B70]">{related.readingTime || 5} min read</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        .blog-content h1 { font-size: 2em; font-weight: 700; line-height: 1.2; margin: 1.2em 0 0.4em; color: #F5F5F7; letter-spacing: -0.02em; }
        .blog-content h2 { font-size: 1.6em; font-weight: 700; line-height: 1.25; margin: 1em 0 0.4em; color: #F5F5F7; letter-spacing: -0.02em; }
        .blog-content h3 { font-size: 1.3em; font-weight: 600; line-height: 1.3; margin: 0.8em 0 0.3em; color: #F5F5F7; }
        .blog-content p { margin: 0.8em 0; line-height: 1.75; color: #C7C7CC; }
        .blog-content ul, .blog-content ol { padding-left: 1.5em; margin: 0.8em 0; color: #C7C7CC; }
        .blog-content li { margin: 0.3em 0; }
        .blog-content blockquote { border-left: 3px solid #F5F5F7; padding-left: 1.2em; margin: 1.5em 0; color: #A1A1A6; font-style: italic; background: rgba(255,255,255,0.02); padding: 1em 1.2em; border-radius: 0 12px 12px 0; }
        .blog-content pre { background: #0a0a0a; border-radius: 16px; padding: 1.2em; margin: 1.2em 0; overflow-x: auto; font-family: "SF Mono","Fira Code",monospace; font-size: 0.9em; border: 1px solid rgba(255,255,255,0.08); }
        .blog-content code { background: #2C2C2E; border-radius: 6px; padding: 0.2em 0.4em; font-size: 0.9em; color: #FF6B6B; }
        .blog-content pre code { background: none; padding: 0; color: inherit; }
        .blog-content img { max-width: 100%; height: auto; border-radius: 16px; margin: 1.5em 0; border: 1px solid rgba(255,255,255,0.06); }
        .blog-content a { color: #F5F5F7; text-decoration: underline; text-decoration-color: rgba(255,255,255,0.3); transition: text-decoration-color 0.2s; }
        .blog-content a:hover { text-decoration-color: #F5F5F7; }
        .blog-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2em 0; }
      `}</style>
    </>
  );
}