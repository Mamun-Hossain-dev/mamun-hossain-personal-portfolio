import React from "react";
import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Not Authorized</h1>
      <p className="mb-6">
        You do not have permission to access the dashboard.
      </p>
      <Link href="/">
        <span className="px-6 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition">
          Go Home
        </span>
      </Link>
    </div>
  );
}
