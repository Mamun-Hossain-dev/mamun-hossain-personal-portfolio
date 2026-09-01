import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/Mamun-Hossain-dev", icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mamun-hossain-3a568b248",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:mamundev1281@gmail.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>Mamun Hossain</span>
        </a>
        <p>Building carefully. Shipping often.</p>
        <div className="footer-links">
          {links.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"}>
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
        <small>© {new Date().getFullYear()} Mamun Hossain</small>
      </div>
    </footer>
  );
}
