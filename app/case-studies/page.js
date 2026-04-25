"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const demoStudies = [
  {
    id: "demo1",
    title: "E-Commerce Platform Redesign",
    description:
      "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization. Implemented modern design patterns and mobile-first approach.",
    imageUrl: "/images/project_placeholder.jpg",
    tags: ["UI/UX", "E-commerce", "React"],
  },
  {
    id: "demo2",
    title: "Healthcare Management System",
    description:
      "Built a comprehensive healthcare management system with patient records, appointment scheduling, and real-time analytics dashboard.",
    imageUrl: "/images/project_placeholder.jpg",
    tags: ["Healthcare", "Full Stack", "Next.js"],
  },
  {
    id: "demo3",
    title: "AI-Powered Content Platform",
    description:
      "Developed an AI-powered content creation and management platform with advanced analytics and automated content optimization.",
    imageUrl: "/images/project_placeholder.jpg",
    tags: ["AI/ML", "SaaS", "Python"],
  },
];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "case_studies"));
        const studies = [];
        querySnapshot.forEach((doc) => {
          studies.push({ id: doc.id, ...doc.data() });
        });
        setCaseStudies(studies.length > 0 ? studies : demoStudies);
      } catch (error) {
        setCaseStudies(demoStudies);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
            Case Studies
          </p>
          <h1 className="mb-4 text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            Case Studies
          </h1>
          <p className="mb-12 max-w-2xl text-[17px] leading-[1.6] text-[#86868B]">
            Dive into our detailed case studies showcasing the challenges
            we&apos;ve tackled and the solutions we&apos;ve delivered.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#2997FF]"></div>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <svg
                className="h-16 w-16 text-[#86868B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="text-xl font-bold text-[#F5F5F7]">
                No Case Studies Found
              </h3>
              <p className="max-w-md text-center text-[#86868B]">
                We&apos;re currently working on adding new case studies. Check
                back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => {
                const tagsArray = Array.isArray(study.tags)
                  ? study.tags
                  : String(study.tags)
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean);
                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.id}`}
                    className="block overflow-hidden rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                  >
                    {study.imageUrl ? (
                      <Image
                        src={study.imageUrl}
                        alt={study.title}
                        width={120}
                        height={80}
                        style={{ width: 120, height: "auto" }}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-[#111111]">
                        <svg
                          className="h-12 w-12 text-[#86868B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="mb-2 text-xl font-bold text-[#F5F5F7]">
                        {study.title}
                      </h2>
                      <p className="mb-4 line-clamp-3 text-sm leading-[1.6] text-[#86868B]">
                        {study.description}
                      </p>
                      {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {tagsArray.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
