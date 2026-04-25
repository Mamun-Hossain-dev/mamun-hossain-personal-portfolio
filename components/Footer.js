"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Facebook, Github } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/mamun.hossain.565330",
      label: "Facebook",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/mamun-hossain-3a568b248/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={20} />,
      url: "#",
      label: "Twitter",
    },
    {
      icon: <Github size={20} />,
      url: "https://github.com/Mamun-Hossain-dev",
      label: "Github",
    },
  ];

  return (
    <motion.footer
      className="border-t border-white/[0.08] bg-[#0a0a0a] py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-[#86868B] transition-colors hover:text-[#F5F5F7]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-[#86868B]">
          © 2026 Mamun Hossain. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
