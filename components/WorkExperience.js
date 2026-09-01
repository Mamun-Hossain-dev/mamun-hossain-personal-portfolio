import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Reveal from "./Reveal";

const experiences = [
  {
    company: "Betopia Group",
    role: "Full Stack Developer",
    period: "Jul 2025 — Present",
    location: "Dhaka, Bangladesh",
    intro:
      "Building production systems with domain-driven Node.js, NestJS, PostgreSQL, and Prisma.",
    points: [
      "Designed 10+ modular REST API modules and optimized database indexes to reduce query execution time by 40%.",
      "Built RabbitMQ workflows across three independent consumers, offloading 70% of background tasks and reducing average API latency by 35% in testing.",
      "Implemented JWT, RBAC, idempotent Stripe webhooks, and Dockerized GitHub Actions deployments with zero-downtime releases.",
    ],
  },
  {
    company: "UpSkill Digital Agency",
    role: "Full Stack Developer · Part-time",
    period: "Feb 2025 — Jun 2025",
    location: "Dhaka, Bangladesh",
    intro:
      "Owned backend API design and authentication for client-facing MERN applications.",
    points: [
      "Delivered 3+ SEO-optimized full-stack applications on schedule for agency clients.",
      "Integrated Firebase and Clerk authentication into Next.js applications while collaborating with designers on responsive interfaces.",
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="section section-soft">
      <div className="site-shell">
        <Reveal className="section-intro experience-intro">
          <div>
            <p className="eyebrow">Selected experience</p>
            <h2 className="section-title">
              Shipping is part of <em>the craft.</em>
            </h2>
          </div>
          <p className="section-lead">
            The teams and products where I&apos;ve turned architecture decisions
            into software that works in the real world.
          </p>
        </Reveal>

        <div className="experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 100}>
              <article className="experience-card">
                <div className="experience-index" aria-hidden="true">
                  <span>0{index + 1}</span>
                  <div className="experience-line" />
                </div>
                <div className="experience-main">
                  <div className="experience-heading">
                    <div>
                      <p className="experience-period">{experience.period}</p>
                      <h3>{experience.company}</h3>
                      <p className="experience-role">
                        <BriefcaseBusiness size={15} aria-hidden="true" />
                        {experience.role} · {experience.location}
                      </p>
                    </div>
                    <ArrowUpRight className="experience-arrow" size={21} aria-hidden="true" />
                  </div>
                  <p className="experience-intro-copy">{experience.intro}</p>
                  <ul className="experience-points">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
