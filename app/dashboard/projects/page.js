"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Trash2, Pencil, Plus, Eye, Search } from "lucide-react";
import ProjectForm from "@/components/dashboard/ProjectForm";
import Link from "next/link";

const appleEase = [0.25, 0.1, 0.25, 1];

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      projectsData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      });
      setProjects(projectsData);
    } catch (err) {
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        if (project.imageUrl) {
          const matches = project.imageUrl.match(/\/v\d+\/([^\.\/]+)\./);
          const publicId = matches ? matches[1] : null;
          if (publicId) {
            await fetch(`/api/delete-cloudinary?public_id=${publicId}`);
          }
        }
        await deleteDoc(doc(db, "projects", project.id));
        fetchProjects();
      } catch (err) {
        setError("Failed to delete project. Please try again.");
      }
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
    fetchProjects();
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedProject(null);
    setSuccess(true);
    fetchProjects();
  };

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.03em] text-[#F5F5F7]">
          Projects
        </h1>
        <p className="mt-2 text-[#86868B] text-[15px]">
          Manage your portfolio projects
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
              placeholder="Search projects..."
              className="w-full rounded-[980px] border border-white/[0.08] bg-[#1C1C1E] pl-10 pr-4 py-2.5 text-sm text-[#F5F5F7] placeholder:text-[#86868B] focus:border-white/20 focus:outline-none transition-all"
            />
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedProject(null);
            setShowForm(true);
            setSuccess(false);
          }}
          className="rounded-[980px] bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-white/90 shadow-sm"
        >
          <Plus size={16} className="inline mr-1.5" />
          Upload Project
        </button>
      </div>

      {/* Success / Error */}
      {success && (
        <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          Project saved successfully!
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: appleEase }}
            className="relative w-full max-w-2xl rounded-[28px] border border-white/[0.08] bg-[#1C1C1E] shadow-[0_40px_80px_rgba(0,0,0,0.5)] mx-4 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F5F5F7]">
                {selectedProject ? "Edit Project" : "Upload New Project"}
              </h2>
              <button
                onClick={handleFormClose}
                className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProjectForm
              onSubmit={handleFormSubmit}
              initialData={selectedProject}
              onClose={handleFormClose}
            />
          </motion.div>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🗂️</div>
          <h3 className="text-lg font-medium text-[#F5F5F7] mb-2">
            {searchQuery ? "No projects match your search" : "No projects yet"}
          </h3>
          <p className="text-[#86868B] mb-6">
            {searchQuery ? "Try a different search term" : "Upload your first project to get started"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-[980px] bg-white px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-white/90"
            >
              Upload First Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, ease: appleEase }}
              className="group rounded-2xl border border-white/[0.06] bg-[#1C1C1E] p-4 transition-all duration-200 hover:border-white/10 hover:bg-[#222224]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {project.imageUrl && (
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden border border-white/[0.06]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#F5F5F7] truncate">
                        {project.title}
                      </h3>
                      {project.techStack && (
                        <p className="text-[12px] text-[#86868B] mt-0.5">
                          {project.techStack}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/projects/${project.id}`}
                    target="_blank"
                    className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>
                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-[#F5F5F7]"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="rounded-full p-2 text-[#86868B] transition-all hover:bg-white/10 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}