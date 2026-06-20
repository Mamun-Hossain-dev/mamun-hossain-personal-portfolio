"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const projects = [
  {
    title: "ClinicallyManic",
    subtitle: "Enterprise-Grade Full-Stack Monorepo",
    description:
      "Consumer frontend, admin dashboard, and Express API — all containerized and independently deployable with Docker Compose.",
    highlights: [
      "Redis cache-aside layer cutting API response latency by ~95% (50ms → 2ms)",
      "Triple-layer payment idempotency — zero duplicate charges in production",
      "Multi-stage Docker builds: 1.25 GB → 128 MB (~90% reduction)",
    ],
    tech: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Docker",
      "Nginx",
    ],
    liveUrl: "https://clinicallymanic-frontend.vercel.app/",
    repoUrl: "https://github.com/Mamun-Hossain-dev",
  },
  {
    title: "Wasabi Gaming",
    subtitle: "Full-Stack Monorepo with Real-Time AI Integration",
    description:
      "User site, admin dashboard, and backend API — featuring webhook-driven async pipelines and real-time streaming.",
    highlights: [
      "Webhook-driven async pipeline for third-party AI with real-time Socket.io streaming",
      "MongoDB compound indexing improving query performance by ~65%",
      "GitHub Actions CI/CD with SSH-based VPS — zero-downtime releases",
    ],
    tech: [
      "Next.js 14",
      "TypeScript",
      "MongoDB",
      "Socket.io",
      "Stripe",
      "Docker",
      "GitHub Actions",
    ],
    liveUrl: "https://wasabi-gaming-final-frontend.vercel.app/",
    repoUrl: "https://github.com/Mamun-Hossain-dev",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="border-t border-white/[0.06] bg-[#000000] py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B70]">
            Featured Projects
          </p>
          <h2 className="max-w-3xl mx-auto text-[clamp(36px,5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#F5F5F7]">
            Production systems {"I've"} architected and shipped.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-[16px] leading-[1.7] text-[#6B6B70]">
            Each project reflects real engineering decisions — caching strategies,
            payment idempotency, CI/CD pipelines, and containerized deployments.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: appleEase,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative rounded-3xl border border-white/[0.06] bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-[#0d0d0d] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium text-[#6B6B70] tracking-wider uppercase">
                      Featured
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-[#F5F5F7]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#6B6B70]">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    <motion.a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-white/[0.12] bg-white/[0.04] p-2.5 text-[#F5F5F7] transition-all hover:bg-white/[0.08]"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={18} />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-white p-2.5 text-[#000000] transition-all hover:bg-white/90"
                      aria-label={`${project.title} live demo`}
                    >
                      <ArrowUpRight size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[15px] leading-[1.7] text-[#A1A1A6]">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="mt-6 space-y-3">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-[#86868B]">
                      <span className="mt-[6px] h-1 w-1 flex-none rounded-full bg-white/40" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-[#6B6B70]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/Mamun-Hossain-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[14px] font-medium text-[#F5F5F7] transition-all hover:bg-white/[0.04]"
          >
            <Github size={18} />
            <span>View more on GitHub</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;