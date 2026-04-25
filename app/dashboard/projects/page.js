"use client";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Trash2, Pencil } from "lucide-react";
import ProjectForm from "@/components/dashboard/ProjectForm";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
        // Delete image from Cloudinary if present
        if (project.imageUrl) {
          // Extract public_id from imageUrl
          const matches = project.imageUrl.match(/\/v\d+\/([^\.\/]+)\./);
          const publicId = matches ? matches[1] : null;
          if (publicId) {
            await fetch(`/api/delete-cloudinary?public_id=${publicId}`);
          }
        }
        // Delete Firestore document
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

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        Projects (Admin)
      </h1>
      <button
        className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold hover:from-purple-700 hover:to-pink-700 transition"
        onClick={() => {
          setShowForm(true);
          setSelectedProject(null);
          setSuccess(false);
        }}
      >
        {showForm ? "Cancel" : "Upload Project"}
      </button>
      {showForm && (
        <div className="w-full max-w-xl mb-8">
          <ProjectForm
            onSubmit={handleFormSubmit}
            initialData={selectedProject}
            onClose={handleFormClose}
          />
        </div>
      )}
      {success && (
        <div className="text-green-400 font-medium mb-4">Project saved!</div>
      )}
      {error && <div className="text-red-400 font-medium mb-4">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden w-full max-w-4xl">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tech Stack
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.techStack}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No projects found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
