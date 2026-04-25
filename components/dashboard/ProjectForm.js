"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase.config";

// Helper function to generate a unique ID
const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

const CLOUDINARY_UPLOAD_PRESET = "mamun's portfolio";
const CLOUDINARY_CLOUD_NAME = "dlcpaiziv";
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ProjectForm = ({ onSubmit, initialData, onClose }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [liveLink, setLiveLink] = useState(initialData?.liveLink || "");
  const [repoLink, setRepoLink] = useState(initialData?.repoLink || "");
  const [screenshot, setScreenshot] = useState(initialData?.screenshot || null);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [techStack, setTechStack] = useState(initialData?.techStack || "");
  const [tags, setTags] = useState(initialData?.tags || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isCompressing, setIsCompressing] = useState(false);

  const handleScreenshotChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.secure_url) throw new Error("Cloudinary upload failed");
      setImageUrl(data.secure_url);
      setScreenshot(null);
    } catch (error) {
      console.error("Image upload error:", error);
      setError("Failed to upload image. Please try a different file.");
      setScreenshot(null);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!imageUrl) {
        setError("Please upload a project screenshot.");
        setLoading(false);
        return;
      }
      // Save to Firestore
      const id = initialData?.id || generateUniqueId();
      await setDoc(doc(collection(db, "projects"), id), {
        title,
        liveLink,
        repoLink,
        imageUrl,
        description,
        techStack,
        tags,
        createdAt: initialData?.createdAt || Timestamp.now(),
      });
      if (onSubmit)
        onSubmit({
          id,
          title,
          liveLink,
          repoLink,
          imageUrl,
          description,
          techStack,
          tags,
        });
      // Reset form
      setTitle("");
      setLiveLink("");
      setRepoLink("");
      setScreenshot(null);
      setImageUrl("");
      setDescription("");
      setTechStack("");
      setTags("");
      if (onClose) onClose();
    } catch (err) {
      setError("Failed to save project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Live Link</label>
        <input
          type="url"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Repository Link</label>
        <input
          type="url"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="https://github.com/..."
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Project Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleScreenshotChange}
          className="w-full"
          disabled={isCompressing || loading}
        />
        {isCompressing && (
          <div className="text-sm text-gray-400 mt-1">
            Compressing & uploading...
          </div>
        )}
        {imageUrl && (
          <div className="mt-2">
            <Image
              src={imageUrl}
              alt="Preview"
              width={320}
              height={240}
              style={{ width: 320, height: "auto" }}
              className="max-w-xs h-auto rounded-lg"
            />
          </div>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">
          Description (Markdown supported)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded border min-h-[120px]"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Tech Stack</label>
        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="e.g. React, Node.js, MongoDB"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 rounded border"
          placeholder="e.g. portfolio, dashboard"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded font-semibold"
          disabled={loading || isCompressing}
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
