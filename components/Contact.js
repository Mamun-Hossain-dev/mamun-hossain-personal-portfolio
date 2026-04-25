"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const WEB3FORMS_ACCESS_KEY = "e18e94ea-2ad7-4120-8b40-9a3f61a419a6";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("service", formData.service || "Not specified");
      formDataToSend.append("message", formData.description);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({
          type: "success",
          text: "Thank you for your message! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          service: "",
          description: "",
        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({
        type: "error",
        text: "Failed to send message. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/mamun.hossain.565330",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mamun-hossain-3a568b248/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/Mamun-Hossain-dev",
      label: "Github",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="text-[#2997FF]" size={22} />,
      title: "Email",
      detail: "mamundev1281@gmail.com",
      href: "mailto:mamundev1281@gmail.com",
    },
    {
      icon: <Phone className="text-[#2997FF]" size={22} />,
      title: "Phone",
      detail: "+880-1640-571091",
      href: "tel:+8801640571091",
    },
    {
      icon: <MapPin className="text-[#2997FF]" size={22} />,
      title: "Location",
      detail: "Uttara, Dhaka, Bangladesh",
    },
  ];

  return (
    <section
      id="connect"
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
            Contact
          </p>
          <h1 className="max-w-3xl text-[clamp(40px,6vw,48px)] font-bold leading-tight tracking-[-0.03em] text-[#F5F5F7]">
            Let&apos;s build something production-ready.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-[#86868B]">
            Send a message about your project, backend architecture, or full-stack
            product needs.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: appleEase }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <ContactItem key={contact.title} {...contact} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#F5F5F7]">Social</h3>
              <div className="mt-4 flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2C2C2E] bg-[#1C1C1E] text-[#86868B] transition-colors hover:border-white/[0.15] hover:text-[#F5F5F7]"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="mb-6 text-2xl font-bold text-[#F5F5F7]">
              Get In Touch
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInputField
                icon={<User size={18} className="text-[#86868B]" />}
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                error={errors.name}
                required
              />

              <AnimatedInputField
                icon={<Mail size={18} className="text-[#86868B]" />}
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                error={errors.email}
                required
              />

              <div>
                <label className="mb-2 block text-sm font-normal text-[#86868B]">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#2C2C2E] bg-[#0a0a0a] px-4 py-3 text-[#F5F5F7] outline-none transition-colors focus:border-[#2997FF]"
                >
                  <option value="">Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="React & Next.js Applications">
                    React & Next.js Applications
                  </option>
                  <option value="Backend Development (Node.js & Express)">
                    Backend Development (Node.js & Express)
                  </option>
                  <option value="Firebase Integration">
                    Firebase Integration
                  </option>
                  <option value="MongoDB Database Solutions">
                    MongoDB Database Solutions
                  </option>
                  <option value="Portfolio Website">Portfolio Website</option>
                  <option value="Dashboard Development">
                    Dashboard Development
                  </option>
                  <option value="eCommerce Platform">eCommerce Platform</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-normal text-[#86868B]">
                  Description <span className="text-[#2997FF]">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full resize-none rounded-xl border bg-[#0a0a0a] py-3 pl-10 pr-4 text-[#F5F5F7] outline-none transition-colors focus:border-[#2997FF] ${
                      errors.description
                        ? "border-red-500/50"
                        : "border-[#2C2C2E]"
                    }`}
                    placeholder="Tell me about your project, requirements, or questions..."
                  />
                  <MessageSquare
                    className="absolute left-3 top-4 text-[#86868B]"
                    size={18}
                  />
                </div>
                {errors.description && (
                  <p className="text-sm text-red-400">{errors.description}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-[980px] bg-[#2997FF] px-6 py-3 text-[17px] font-normal text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_14px_34px_rgba(41,151,255,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            {message.text && (
              <div
                className={`mt-6 text-center text-base ${
                  message.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AnimatedInputField = ({ icon, label, optional, error, required, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-normal text-[#86868B]">
        {label} {required && <span className="text-[#2997FF]">*</span>}
        {optional && <span className="ml-1 text-[#86868B]">(Optional)</span>}
      </label>
      <div className="relative">
        <input
          className={`w-full rounded-xl border bg-[#0a0a0a] py-3 pl-10 pr-4 text-[#F5F5F7] outline-none transition-colors focus:border-[#2997FF] ${
            error ? "border-red-500/50" : "border-[#2C2C2E]"
          }`}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

const ContactItem = ({ icon, title, detail, href }) => {
  const content = (
    <motion.div
      className="flex items-start gap-4 rounded-[18px] border border-[#2C2C2E] bg-[#1C1C1E] p-5 transition-all duration-300 hover:border-white/[0.15]"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: appleEase }}
    >
      <div className="mt-1 shrink-0">{icon}</div>
      <div>
        <h3 className="font-bold text-[#F5F5F7]">{title}</h3>
        <p className="mt-1 text-[17px] leading-[1.6] text-[#86868B]">
          {detail}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default ContactSection;
