"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CaseStudyForm from "@/components/dashboard/CaseStudyForm";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/config/firebase.config";
import { ref, deleteObject } from "firebase/storage";
import { Trash2, Pencil } from "lucide-react";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "case_studies"));
      const studies = [];
      querySnapshot.forEach((doc) => {
        studies.push({ id: doc.id, ...doc.data() });
      });
      setCaseStudies(studies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      setError("Failed to load case studies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (study) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      try {
        // Delete image from storage if it exists
        if (study.imageUrl) {
          const imageRef = ref(storage, study.imageUrl);
          await deleteObject(imageRef);
        }
        // Delete firestore document
        await deleteDoc(doc(db, "case_studies", study.id));
        fetchCaseStudies();
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          console.warn("Image not found in storage, deleting document anyway.");
          await deleteDoc(doc(db, "case_studies", study.id));
          fetchCaseStudies();
        } else {
          console.error("Error deleting case study:", error);
        }
      }
    }
  };

  const handleEdit = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCaseStudy(null);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Dashboard Overview
          </span>
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Add New Case Study
        </motion.button>
      </div>

      {showForm && (
        <CaseStudyForm
          caseStudy={selectedCaseStudy}
          onClose={handleFormClose}
          onSuccess={fetchCaseStudies}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400 bg-red-900/20 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Tags
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {caseStudies.map((study) => (
                <tr key={study.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/case-studies/${study.id}`}
                      className="text-sm font-medium text-gray-100 hover:text-purple-400 transition-colors"
                    >
                      {study.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {study.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(study)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(study)}
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
          {caseStudies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No case studies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
