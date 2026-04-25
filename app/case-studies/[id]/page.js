"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { motion } from "framer-motion";
import { ArrowLeft, Tag } from "lucide-react";

export default function CaseStudyDetailPage({ params }) {
  const actualParams = React.use(params);
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (actualParams.id) {
      const fetchCaseStudy = async () => {
        setLoading(true);
        setError(null);
        try {
          const docRef = doc(db, "case_studies", actualParams.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCaseStudy({ id: docSnap.id, ...docSnap.data() });
          } else {
            setError("Case study not found.");
          }
        } catch (err) {
          console.error("Error fetching case study:", err);
          setError("Failed to load case study. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchCaseStudy();
    }
  }, [actualParams.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-[#2997FF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-[#F5F5F7]">
        <p className="text-2xl text-red-400 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="rounded-[980px] bg-[#2997FF] px-6 py-3 text-white transition-all hover:brightness-110"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!caseStudy) {
    return null; // Should be handled by loading/error states
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => router.back()}
            className="group mb-8 flex items-center gap-2 text-[#2997FF] transition-all hover:brightness-110"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
            Case Study
          </p>
          <h1 className="mb-4 text-[clamp(40px,6vw,56px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="w-5 h-5 text-[#86868B]" />
            {caseStudy.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="my-8 overflow-hidden rounded-[18px] border border-[#2C2C2E]"
        >
          {caseStudy.imageUrl && (
            <Image
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="prose prose-invert prose-lg max-w-none text-[17px] leading-[1.6] text-[#86868B]"
        >
          <p>{caseStudy.description}</p>
        </motion.div>
      </div>
    </div>
  );
}
