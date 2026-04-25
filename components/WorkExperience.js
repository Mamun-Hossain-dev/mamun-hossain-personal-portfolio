"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const experiences = [
  {
    company: "Betopia Group",
    role: "Full-Stack Developer",
    period: "Jul 2025 - Present",
    location: "Dhaka, Bangladesh",
    icon: BriefcaseBusiness,
    points: [
      "Building and maintaining full-stack features in production using Next.js 14, Node.js, PostgreSQL, and Prisma ORM.",
      "Designing modular backend architectures with clean separation of controllers, services, and repositories.",
      "Implementing auth flows, role-based access control, and performance-optimized API layers.",
    ],
  },
  {
    company: "UpSkill Digital Agency",
    role: "Full-Stack Developer (Part-time)",
    period: "Feb 2025 - Jun 2025",
    location: "Dhaka, Bangladesh",
    icon: BriefcaseBusiness,
    points: [
      "Built SEO-optimized full-stack web applications using the MERN stack for agency clients.",
      "Integrated Firebase and Clerk authentication with dynamic routing in Next.js projects.",
      "Delivered responsive, high-performance UIs in close collaboration with designers.",
    ],
  },
  {
    company: "Northern University Computer Club",
    role: "Frontend Instructor",
    period: "Jan 2024 - Jan 2025",
    location: "Dhaka, Bangladesh",
    icon: GraduationCap,
    points: [
      "Trained 50+ students in React, Next.js, and JavaScript.",
      "Mentored junior devs through hands-on projects and workshop sessions.",
    ],
  },
];

const WorkExperience = () => {
  return (
    <section
      id="work-experience"
      className="border-t border-white/[0.08] bg-[#0a0a0a] py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
            Work Experience
          </p>
          <h2 className="max-w-3xl text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            Real product work, client delivery, and hands-on mentoring.
          </h2>
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.6] text-[#86868B]">
            A quick look at the teams, products, and learning environments
            where I have been building, shipping, and teaching modern web
            experiences.
          </p>
        </motion.div>

        <div className="space-y-5">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;

            return (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: appleEase,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[#F5F5F7]">
                      <Icon size={16} />
                      <span>{experience.role}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#F5F5F7]">
                      {experience.company}
                    </h3>
                    <p className="mt-2 text-[15px] text-[#D6D6D8]">
                      {experience.period}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-[#A1A1A6]">
                      <MapPin size={15} />
                      <span>{experience.location}</span>
                    </div>
                  </div>

                  <ul className="max-w-2xl space-y-3 text-[16px] leading-[1.7] text-[#C7C7CC]">
                    {experience.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-white/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
