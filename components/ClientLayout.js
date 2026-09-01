"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
