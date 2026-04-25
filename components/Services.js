"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const Services = () => {
  const skillGroups = [
    {
      title: "Languages",
      items: ["TypeScript", "JavaScript", "C++", "HTML5", "CSS3"],
    },
    {
      title: "Frontend",
      items: [
        "React.js",
        "Next.js 14",
        "Tailwind CSS",
        "Shadcn/UI",
        "Radix UI",
        "Zustand",
        "TanStack React Query",
        "React Hook Form",
        "Zod",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
        "NextAuth",
        "Stripe (Checkout + Webhooks)",
        "Socket.io",
        "Nodemailer",
      ],
    },
    {
      title: "Database & ORM",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Prisma ORM",
        "Mongoose",
        "Redis (Upstash)",
      ],
    },
    {
      title: "Cloud & Tools",
      items: [
        "Cloudinary",
        "Firebase",
        "Git",
        "GitHub",
        "Vercel",
        "Postman",
        "Swagger/OpenAPI",
      ],
    },
    {
      title: "Currently Exploring",
      items: [
        "Docker",
        "CI/CD pipelines",
        "deployment workflows",
        "system design",
      ],
    },
  ];

  return (
    <section
      id="services"
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
            Skills
          </p>
          <h2 className="max-w-3xl text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            Modern full-stack tools for fast, maintainable product work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: appleEase }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] p-6 transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <h3 className="text-xl font-bold text-[#F5F5F7]">
                {group.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14"
        >
          <button
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="group flex items-center gap-3 rounded-[980px] border border-white/80 bg-white px-6 py-3 text-[17px] font-medium text-[#0a0a0a] shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(255,255,255,0.18)]"
          >
            <span>Get in Touch</span>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
