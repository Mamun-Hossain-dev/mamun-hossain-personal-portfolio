import { ArrowUpRight, Blocks, Database, Gauge, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const strengths = [
  {
    icon: Blocks,
    number: "01",
    title: "Structure before scale",
    text: "Modular, domain-driven backends with boundaries that stay understandable as products grow.",
  },
  {
    icon: Gauge,
    number: "02",
    title: "Performance with intent",
    text: "Caching, indexes, and measured trade-offs that turn slow paths into dependable ones.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Reliability by design",
    text: "Idempotent payments, clear contracts, and asynchronous workflows built for real edge cases.",
  },
  {
    icon: Database,
    number: "04",
    title: "Own the whole path",
    text: "From a responsive Next.js interface to the API, database, container, and deployment underneath.",
  },
];

export default function About() {
  return (
    <section id="about" className="section section-soft">
      <div className="site-shell">
        <Reveal className="section-intro about-intro">
          <div>
            <p className="eyebrow">About the engineer</p>
            <h2 className="section-title">
              I care about the part users <em>never see.</em>
            </h2>
          </div>
          <div className="about-summary">
            <p>
              I build the systems behind useful products: APIs that stay clear,
              data flows that stay consistent, and infrastructure that does not
              get in the team&apos;s way.
            </p>
            <p>
              My strongest work sits at the intersection of backend architecture,
              product thinking, and the discipline to ship. I&apos;m currently
              deepening my understanding of AWS and distributed system design.
            </p>
            <a className="text-link" href="#capabilities">
              How I work <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <div className="strength-grid">
          {strengths.map(({ icon: Icon, number, title, text }, index) => (
            <Reveal key={title} delay={index * 70}>
              <article className="strength-card">
                <div className="strength-topline">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-footnote" delay={120}>
          <div className="education-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>
            B.Sc. in Computer Science and Engineering · Northern University
            Bangladesh · 2023–2027
          </p>
          <span className="footnote-extra">100+ LeetCode problems solved</span>
        </Reveal>
      </div>
    </section>
  );
}
