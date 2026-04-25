"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const appleEase = [0.25, 0.1, 0.25, 1];

const About = () => {
  const skills = [
    "TypeScript",
    "JavaScript",
    "C++",
    "HTML5",
    "CSS3",
    "React.js",
    "Next.js 14",
    "Tailwind CSS",
    "Shadcn/UI",
    "Radix UI",
    "Zustand",
    "TanStack React Query",
    "React Hook Form",
    "Zod",
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT",
    "NextAuth",
    "Stripe (Checkout + Webhooks)",
    "Socket.io",
    "Nodemailer",
    "PostgreSQL",
    "MongoDB",
    "Prisma ORM",
    "Mongoose",
    "Redis (Upstash)",
    "Cloudinary",
    "Firebase",
    "Git",
    "GitHub",
    "Vercel",
    "Postman",
    "Swagger/OpenAPI",
  ];

  return (
    <section
      id="about"
      className="border-t border-white/[0.08] bg-[#0a0a0a] py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden justify-center md:flex"
        >
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E]">
            <Image
              src="/images/mamun.jpeg"
              alt="Mamun Hossain"
              fill
              sizes="420px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#86868B]">
            About
          </p>
          <h2 className="text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            Building production-ready software with a clean engineering mindset.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-[#86868B]">
            Full-Stack Web Developer focused on building scalable,
            high-performance web applications with modern JavaScript. I work
            primarily with React and Next.js on the frontend, and Node.js on the
            backend — designing clean architectures, efficient APIs, and
            maintainable systems. I leverage AI-assisted development workflows
            to move faster, own projects end-to-end, and ship production-ready
            software confidently. Always building. Always learning. Always
            improving.
          </p>

          <div className="mt-10">
            <h3 className="text-xl font-bold text-[#F5F5F7]">
              Technical Skills
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#2C2C2E] px-3 py-1 text-xs text-[#86868B]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
