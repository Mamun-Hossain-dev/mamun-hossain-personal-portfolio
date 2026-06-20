"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, memo } from "react";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: appleEase },
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
      className="relative min-h-screen overflow-hidden bg-[#000000] py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-16rem)] max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B70]"
          >
            Full-Stack Developer
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="max-w-3xl text-[clamp(48px,9vw,80px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F5F5F7]"
          >
            Mamun Hossain
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-[#86868B]"
          >
            Full-Stack Developer building scalable, high-performance systems
            with modern technologies. Passionate about backend engineering,
            clean architecture, distributed systems, and understanding how
            things work under the hood.
          </motion.p>
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: appleEase }}
              onClick={handleConnectClick}
              className="cursor-pointer rounded-full bg-white px-6 py-3 text-[16px] font-medium text-[#000000] shadow-sm transition-all hover:bg-white/90"
              aria-label="Connect with Mamun Hossain"
            >
              Connect with me
            </motion.button>
            <motion.button
              whileHover={{
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: appleEase }}
              onClick={handleResumeClick}
              className="cursor-pointer rounded-full border border-white/[0.12] bg-transparent px-6 py-3 text-[16px] font-medium text-white backdrop-blur-md transition-all hover:bg-white/[0.04]"
              aria-label="View Mamun Hossain's resume"
            >
              View Resume
            </motion.button>
          </motion.div>
          <motion.div
            {...fadeUp(0.4)}
            className="mt-10 flex items-center gap-5"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#6B6B70] transition-colors hover:text-[#F5F5F7]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.15)}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative aspect-square w-72 overflow-hidden rounded-full border border-white/[0.08] bg-[#1C1C1E] shadow-[inset_0_0_40px_rgba(255,255,255,0.03)] md:w-96">
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