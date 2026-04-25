"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="mx-auto min-h-[60vh] max-w-6xl px-6 py-32">
      <div className="mb-16">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
          Selected Work
        </p>
        <h1 className="text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
          Projects
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#2997FF]"></div>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-[17px] text-[#86868B]">
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              {project.imageUrl && (
                <div className="relative w-full h-56">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="mb-2 line-clamp-1 text-2xl font-bold text-[#F5F5F7]">
                  {project.title}
                </h2>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-[1.6] text-[#86868B]">
                  {project.description}
                </p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.techStack.split(",").map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex gap-2">
                  <span className="font-normal text-[#2997FF]">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
