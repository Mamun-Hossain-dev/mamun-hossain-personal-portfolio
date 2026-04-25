// components/ClientLayout.jsx
"use client";

import { AuthProvider } from "@/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

export default function ClientLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </AuthProvider>
    </>
  );
}
