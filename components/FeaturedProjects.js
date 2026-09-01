import { ArrowUpRight, Github, Layers3, Zap } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    number: "01",
    title: "DeviceDock",
    subtitle: "Production e-commerce platform",
    description:
      "A full-stack storefront and modular backend for catalog, cart, authentication, checkout, and order management.",
    outcome:
      "Redis caching brought the product API down to about 17ms in testing, while RabbitMQ and idempotent payment flows kept checkout reliable.",
    tech: ["NestJS", "PostgreSQL", "Redis", "RabbitMQ", "Next.js", "Docker"],
    liveUrl: "https://devicedock.duckdns.org",
    repoUrl: "https://github.com/Mamun-Hossain-dev/devicedock",
    icon: Zap,
  },
  {
    number: "02",
    title: "Humidor411",
    subtitle: "Retail operations platform",
    description:
      "Three connected applications for premium cigar retailers: inventory, humidor mapping, subscriptions, payments, and storefronts.",
    outcome:
      "A reusable Master Cigar Database keeps shared catalog data normalized while each retailer owns its inventory and pricing.",
    tech: ["NestJS", "MongoDB", "Next.js", "Stripe", "Docker"],
    liveUrl: "https://humidor411.com",
    repoUrl: "https://github.com/Mamun-Hossain-dev/Humidor411",
    icon: Layers3,
  },
];

export default function FeaturedProjects() {
  return (
    <section id="work" className="section section-dark work-section">
      <div className="site-shell">
        <Reveal className="section-intro work-intro">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">
              A few systems I&apos;ve <em>shipped.</em>
            </h2>
          </div>
          <p className="section-lead">
            Real products, real constraints, and the engineering decisions that
            made them dependable.
          </p>
        </Reveal>

        <div className="project-list">
          {projects.map(({ number, title, subtitle, description, outcome, tech, liveUrl, repoUrl, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 100}>
              <article className="project-card">
                <div className="project-number">{number}</div>
                <div className="project-content">
                  <div className="project-heading">
                    <div>
                      <p className="project-subtitle">{subtitle}</p>
                      <h3>{title}</h3>
                    </div>
                    <div className="project-icon" aria-hidden="true">
                      <Icon size={21} strokeWidth={1.5} />
                    </div>
                  </div>
                  <p className="project-description">{description}</p>
                  <div className="project-outcome">
                    <span>Outcome</span>
                    <p>{outcome}</p>
                  </div>
                  <div className="project-footer">
                    <div className="tag-list">
                      {tech.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} aria-hidden="true" />
                        <span>Source</span>
                      </a>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <span>Live site</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="work-footer" delay={150}>
          <span>More experiments and source code</span>
          <a className="text-link" href="https://github.com/Mamun-Hossain-dev" target="_blank" rel="noopener noreferrer">
            Visit GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
