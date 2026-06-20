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
  ChevronDown,
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
      icon: <Mail size={22} />,
      title: "Email",
      detail: "mamundev1281@gmail.com",
      href: "mailto:mamundev1281@gmail.com",
    },
    {
      icon: <Phone size={22} />,
      title: "Phone",
      detail: "+880-1640-571091",
      href: "tel:+8801640571091",
    },
    {
      icon: <MapPin size={22} />,
      title: "Location",
      detail: "Uttara, Dhaka, Bangladesh",
    },
  ];

  return (
    <section
      id="connect"
      className="border-t border-white/[0.08] bg-[#0a0a0a] py-28 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B70]">
            Contact
          </p>
          <h1 className="max-w-3xl text-[clamp(36px,5vw,48px)] font-bold leading-[1.1] tracking-[-0.03em] text-[#F5F5F7]">
            {`Let's build something production-ready.`}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-[#86868B]">
            {`Have a project in mind or want to discuss backend architecture, full-stack development, or anything tech-related? Send a message and I'll get back to you within 24 hours.`}
          </p>
        </motion.div>

        {/* Grid: Contact Info Left / Form Right */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left Column — Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: appleEase }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <ContactInfoCard key={item.title} {...item} />
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6B6B70]">
                Find me on
              </h3>
              <div className="mt-5 flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2C2C2E] bg-[#1C1C1E] text-[#86868B] transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-[#F5F5F7]"
                      whileHover={{ y: -3, scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={19} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="rounded-2xl border border-[#2C2C2E] bg-[#1C1C1E] p-6 md:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <FormField
                  icon={<User size={18} className="text-[#6B6B70]" />}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  error={errors.name}
                  required
                />

                {/* Email */}
                <FormField
                  icon={<Mail size={18} className="text-[#6B6B70]" />}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  error={errors.email}
                  required
                />

                {/* Service Interest */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#A1A1A6]">
                    Service Interest
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-[#2C2C2E] bg-[#0a0a0a] px-4 py-3.5 pr-10 text-[#F5F5F7] outline-none transition-all duration-300 focus:border-white/[0.3] focus:ring-1 focus:ring-white/[0.1]"
                    >
                      <option value="" className="bg-[#0a0a0a]">
                        Select a service
                      </option>
                      <option value="Web Development" className="bg-[#0a0a0a]">
                        Web Development
                      </option>
                      <option
                        value="React & Next.js Applications"
                        className="bg-[#0a0a0a]"
                      >
                        React & Next.js Applications
                      </option>
                      <option
                        value="Backend Development (Node.js & Express)"
                        className="bg-[#0a0a0a]"
                      >
                        Backend Development (Node.js & Express)
                      </option>
                      <option
                        value="Firebase Integration"
                        className="bg-[#0a0a0a]"
                      >
                        Firebase Integration
                      </option>
                      <option
                        value="MongoDB Database Solutions"
                        className="bg-[#0a0a0a]"
                      >
                        MongoDB Database Solutions
                      </option>
                      <option
                        value="Portfolio Website"
                        className="bg-[#0a0a0a]"
                      >
                        Portfolio Website
                      </option>
                      <option
                        value="Dashboard Development"
                        className="bg-[#0a0a0a]"
                      >
                        Dashboard Development
                      </option>
                      <option
                        value="eCommerce Platform"
                        className="bg-[#0a0a0a]"
                      >
                        eCommerce Platform
                      </option>
                      <option value="Other" className="bg-[#0a0a0a]">
                        Other
                      </option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B70]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#A1A1A6]">
                    Description{" "}
                    <span className="text-[#F5F5F7]">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Tell me about your project, requirements, or questions..."
                      className={`w-full resize-none rounded-xl border bg-[#0a0a0a] py-3.5 pl-10 pr-4 text-[#F5F5F7] outline-none transition-all duration-300 focus:border-white/[0.3] focus:ring-1 focus:ring-white/[0.1] ${
                        errors.description
                          ? "border-red-500/50"
                          : "border-[#2C2C2E]"
                      }`}
                    />
                    <MessageSquare
                      className="absolute left-3.5 top-4 text-[#6B6B70]"
                      size={18}
                    />
                  </div>
                  {errors.description && (
                    <p className="text-sm text-red-400">{errors.description}</p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2.5 rounded-[980px] bg-white px-6 py-3.5 text-[16px] font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={19} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Status Message */}
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 rounded-xl border p-4 text-center text-sm ${
                    message.type === "success"
                      ? "border-green-500/20 bg-green-500/5 text-green-400"
                      : "border-red-500/20 bg-red-500/5 text-red-400"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Reusable Form Field ─── */
const FormField = ({ icon, label, error, required, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#A1A1A6]">
        {label}{" "}
        {required && <span className="text-[#F5F5F7]">*</span>}
      </label>
      <div className="relative">
        <input
          className={`w-full rounded-xl border bg-[#0a0a0a] py-3.5 pl-10 pr-4 text-[#F5F5F7] outline-none transition-all duration-300 focus:border-white/[0.3] focus:ring-1 focus:ring-white/[0.1] ${
            error ? "border-red-500/50" : "border-[#2C2C2E]"
          }`}
          {...props}
        />
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

/* ─── Contact Info Card ─── */
const ContactInfoCard = ({ icon, title, detail, href }) => {
  const content = (
    <motion.div
      className="group flex items-center gap-4 rounded-xl border border-[#2C2C2E] bg-[#1C1C1E] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: appleEase }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#F5F5F7] transition-colors group-hover:bg-white/[0.15]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6B70]">
          {title}
        </p>
        <p className="mt-0.5 truncate text-[15px] font-medium text-[#F5F5F7]">
          {detail}
        </p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default ContactSection;