"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setIsMenuOpen(false);
  }, [pathname, user]);

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: appleEase }}
      className={`fixed left-0 right-0 top-0 z-50 w-full border-b border-white/[0.08] bg-black/70 backdrop-blur-[20px] transition-all duration-300 ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#F5F5F7]">
            Mamun Hossain
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link-underline relative text-sm text-[#86868B] transition-colors hover:text-[#F5F5F7]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center md:flex">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#F5F5F7] transition-colors hover:bg-white/[0.08]"
                  aria-label="Open profile menu"
                >
                  <UserIcon size={20} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 z-50 mt-3 w-56 rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] p-4 text-[#F5F5F7] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2C2C2E] text-lg font-bold">
                        {user.displayName?.[0] || user.email?.[0] || "U"}
                      </div>
                      <div>
                        <div className="font-bold">
                          {user.displayName || user.email}
                        </div>
                        <div className="text-xs text-[#86868B]">{role}</div>
                      </div>
                    </div>
                    {role === "admin" && (
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          router.push("/dashboard");
                        }}
                        className="mb-2 block w-full rounded-lg px-4 py-2 text-left text-sm text-[#2997FF] transition-colors hover:bg-white/[0.06]"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center rounded-lg px-4 py-2 text-left text-sm text-red-300 transition-colors hover:bg-white/[0.06]"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-[980px] border border-white/20 bg-transparent px-5 py-2 text-sm font-normal text-[#F5F5F7] transition-all"
                >
                  Admin Login
                </motion.button>
              </Link>
            )}
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#F5F5F7] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: appleEase }}
              className="mt-4 overflow-hidden rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] md:hidden"
            >
              <div className="space-y-1 p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-[#86868B] transition-colors hover:bg-white/[0.06] hover:text-[#F5F5F7]"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-white/[0.08] pt-3">
                  {user ? (
                    <>
                      {role === "admin" && (
                        <button
                          onClick={() => router.push("/dashboard")}
                          className="block w-full rounded-xl px-4 py-3 text-left text-[#2997FF] transition-colors hover:bg-white/[0.06]"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => logout()}
                        className="flex w-full items-center rounded-xl px-4 py-3 text-left text-red-300 transition-colors hover:bg-white/[0.06]"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block rounded-xl px-4 py-3 text-[#F5F5F7] transition-colors hover:bg-white/[0.06]"
                    >
                      Admin Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
