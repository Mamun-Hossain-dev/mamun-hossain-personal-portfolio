import { ArrowUpRight, Braces, CloudCog, DatabaseZap, Layers3 } from "lucide-react";
import Reveal from "./Reveal";

const skillGroups = [
  {
    icon: Braces,
    label: "01 / Backend",
    title: "APIs with a point of view",
    text: "Node.js, NestJS, Express, TypeScript, REST APIs, JWT, SOLID, and Clean Architecture.",
    tags: ["Node.js", "NestJS", "TypeScript", "REST APIs"],
  },
  {
    icon: DatabaseZap,
    label: "02 / Data",
    title: "Data that stays useful",
    text: "PostgreSQL and MongoDB models, Prisma and Mongoose, plus Redis for the paths that need speed.",
    tags: ["PostgreSQL", "Prisma", "Redis", "MongoDB"],
  },
  {
    icon: Layers3,
    label: "03 / Distributed",
    title: "Work that moves asynchronously",
    text: "RabbitMQ, BullMQ, Webhooks, Socket.io, and idempotent workflows for dependable side effects.",
    tags: ["RabbitMQ", "BullMQ", "Stripe", "Zod"],
  },
  {
    icon: CloudCog,
    label: "04 / Delivery",
    title: "From local to production",
    text: "Docker, Nginx, Linux, GitHub Actions, Swagger/OpenAPI, and deployment workflows that repeat cleanly.",
    tags: ["Docker", "Nginx", "CI/CD", "Linux"],
  },
];

export default function Services() {
  return (
    <section id="capabilities" className="section section-dark">
      <div className="site-shell">
        <Reveal className="section-intro capabilities-intro">
          <div>
            <p className="eyebrow">The toolkit</p>
            <h2 className="section-title">
              The tools matter. <em>The thinking matters more.</em>
            </h2>
          </div>
          <p className="section-lead">
            A focused set of tools for building maintainable products without
            losing sight of the people who use them.
          </p>
        </Reveal>

        <div className="capability-grid">
          {skillGroups.map(({ icon: Icon, label, title, text, tags }, index) => (
            <Reveal key={label} delay={index * 70}>
              <article className="capability-card">
                <div className="capability-heading">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span>{label}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="tag-list">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="capabilities-cta" delay={140}>
          <p>
            Need someone who can move from architecture conversation to shipped
            feature?
          </p>
          <a className="text-link" href="#contact">
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
