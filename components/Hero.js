"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, memo } from "react";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: appleEase },
});

const Hero = memo(() => {
  const handleConnectClick = useCallback(() => {
    window.location.href = "/contact";
  }, []);

  const handleResumeClick = useCallback(() => {
    window.open("/Mamun_Hossain_updated_resume.pdf", "_blank");
  }, []);

  const socialLinks = [
    {
      icon: <Facebook size={22} />,
      url: "https://www.facebook.com/mamun.hossain.565330",
      label: "Facebook",
    },
    {
      icon: <Linkedin size={22} />,
      url: "https://www.linkedin.com/in/mamun-hossain-3a568b248/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={22} />,
      url: "#",
      label: "Twitter",
    },
    {
      icon: <Github size={22} />,
      url: "https://github.com/Mamun-Hossain-dev",
      label: "Github",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] py-32"
    >
      <div className="mx-auto grid min-h-[calc(100vh-16rem)] max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-5 text-xs font-bold uppercase tracking-widest text-[#86868B]"
          >
            Full-Stack Web Developer
          </motion.p>
          <motion.h1
            {...fadeUp(0)}
            className="max-w-3xl text-[clamp(48px,9vw,80px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F5F5F7]"
          >
            Mamun Hossain
          </motion.h1>
          <motion.p
            {...fadeUp(0.15)}
            className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-[#86868B]"
          >
            Full-Stack Web Developer building scalable, high-performance web
            applications with React, Next.js, and Node.js — focused on clean
            architectures, efficient APIs, and maintainable systems. I leverage
            AI-assisted development workflows to move faster, own projects
            end-to-end, and ship production-ready software. Deeply interested
            in backend engineering, system design, and how applications operate
            under the hood.
          </motion.p>
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 18px 40px rgba(255, 255, 255, 0.16)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: appleEase }}
              onClick={handleConnectClick}
              className="cursor-pointer rounded-[980px] border border-white/80 bg-white px-6 py-3 text-[17px] font-medium text-[#0a0a0a] shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition-all"
              aria-label="Connect with Mamun Hossain"
            >
              Connect with me
            </motion.button>
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 16px 34px rgba(255, 255, 255, 0.08)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: appleEase }}
              onClick={handleResumeClick}
              className="cursor-pointer rounded-[980px] border border-white/15 bg-white/8 px-6 py-3 text-[17px] font-medium text-white backdrop-blur-md transition-all"
              aria-label="View Mamun Hossain's resume"
            >
              View Resume
            </motion.button>
          </motion.div>
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 flex items-center gap-5"
          >
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
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.1)}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative aspect-square w-72 overflow-hidden rounded-full border border-[#2C2C2E] bg-[#1C1C1E] shadow-[inset_0_0_40px_rgba(255,255,255,0.04)] md:w-96">
            <Image
              src="/images/mamun.jpeg"
              alt="Mamun Hossain"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
