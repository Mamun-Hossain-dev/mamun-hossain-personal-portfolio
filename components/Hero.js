import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/Mamun-Hossain-dev", icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mamun-hossain-3a568b248",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:mamundev1281@gmail.com", icon: Mail },
];

const focusAreas = [
  { number: "01", name: "Backend architecture", tools: "Node.js · NestJS" },
  { number: "02", name: "Data & performance", tools: "PostgreSQL · Redis" },
  { number: "03", name: "Event-driven systems", tools: "RabbitMQ · Webhooks" },
  { number: "04", name: "Production delivery", tools: "Docker · CI/CD" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="site-shell hero-layout">
        <div className="hero-copy">
          <div className="hero-identity hero-enter hero-enter-one">
            <span className="status-dot" aria-hidden="true" />
            <span>
              Hello, I&apos;m <strong>Mamun</strong> <i aria-hidden="true">·</i> Full Stack Developer
            </span>
          </div>

          <h1 className="hero-title hero-enter hero-enter-two">
            Building the <span>logic</span> behind meaningful products.
          </h1>

          <p className="hero-description hero-enter hero-enter-three">
            I&apos;m a backend-focused full-stack developer who turns complex ideas
            into clear, dependable software with Node.js, NestJS, and modern
            production practices.
          </p>

          <div className="hero-actions hero-enter hero-enter-four">
            <a className="button button-primary" href="#work">
              Explore my work <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href="/Mamun_Hossain_Full_Stack_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="social-row hero-enter hero-enter-five" aria-label="Social links">
            <span className="social-label">Connect</span>
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className="social-link">
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-skills hero-enter hero-enter-three">
          <div className="hero-skills-heading">
            <span>What I bring</span>
            <span>Core strengths</span>
          </div>
          <div className="hero-skills-list">
            {focusAreas.map((area) => (
              <div className="hero-skill-row" key={area.number}>
                <span className="hero-skill-number">{area.number}</span>
                <div>
                  <h2>{area.name}</h2>
                  <p>{area.tools}</p>
                </div>
                <ArrowUpRight className="hero-skill-arrow" size={18} aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="hero-skills-footer">
            <span>Backend-focused</span>
            <span>End-to-end ownership</span>
          </div>
          <div className="hero-monogram" aria-hidden="true">
            MH<span>.</span>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>Scroll to explore</span>
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
