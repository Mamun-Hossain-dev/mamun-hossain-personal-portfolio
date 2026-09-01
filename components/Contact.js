import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";

const contactLinks = [
  {
    label: "Email",
    value: "mamundev1281@gmail.com",
    href: "mailto:mamundev1281@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+880 1640 571091",
    href: "tel:+8801640571091",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/mamun-hossain-3a568b248",
    icon: Linkedin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="site-shell contact-layout">
        <Reveal className="contact-copy">
          <p className="eyebrow">Let&apos;s talk</p>
          <h2 className="contact-title">
            Have a system to <em>build?</em>
          </h2>
          <p>
            Whether it&apos;s a product idea, a backend that needs structure, or a
            system that needs to move faster, I&apos;d love to hear what you&apos;re
            working on.
          </p>
          <a className="button button-primary" href="mailto:mamundev1281@gmail.com">
            Send an email <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="contact-details" delay={100}>
          <div className="contact-location">
            <MapPin size={17} aria-hidden="true" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="contact-link-list">
            {contactLinks.map(({ label, value, href, icon: Icon }) => (
              <a key={label} href={href} className="contact-link">
                <span className="contact-link-icon">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <ArrowUpRight className="contact-link-arrow" size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="contact-github" href="https://github.com/Mamun-Hossain-dev" target="_blank" rel="noopener noreferrer">
            <Github size={18} aria-hidden="true" />
            <span>See what I&apos;m building on GitHub</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
