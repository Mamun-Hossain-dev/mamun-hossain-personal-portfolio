"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import React from "react";

export default function ProjectDetailPage({ params }) {
  const actualParams = React.use(params);
  const { id } = actualParams;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#2997FF]"></div>
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
  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5F7]">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-32">
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-2 text-[#2997FF] transition-colors hover:brightness-110"
        >
          <span className="text-lg">←</span>
          <span>Go Back</span>
        </button>
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
          Project
        </p>
        <h1 className="mb-4 text-[clamp(40px,6vw,56px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {project.tags &&
            project.tags.split(",").map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
              >
                {tag.trim()}
              </span>
            ))}
        </div>
        {project.imageUrl && (
          <div className="my-8 overflow-hidden rounded-[18px] border border-[#2C2C2E]">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
        <div className="prose prose-invert prose-lg mb-8 max-w-none text-[17px] leading-[1.6] text-[#86868B]">
          <p>{project.description}</p>
        </div>
        {project.techStack && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-bold text-[#F5F5F7]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-8">
          {project.liveLink && (
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[980px] bg-[#2997FF] px-6 py-3 text-[17px] font-normal text-white transition-all hover:brightness-110"
            >
              Live Site
            </Link>
          )}
          {project.repoLink && (
            <Link
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[980px] border border-white/30 bg-transparent px-6 py-3 text-[17px] font-normal text-white backdrop-blur-sm transition-all hover:brightness-110"
            >
              Source Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
