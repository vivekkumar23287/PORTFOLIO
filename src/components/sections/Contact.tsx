"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading, Reveal } from "../ui/SectionHeading";
import {
  Send,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

const socialLinks = [
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com/yourusername",
    color: "#333",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://linkedin.com/in/your-linkedin-profile",
    color: "#0077b5",
  },
  {
    name: "X (Twitter)",
    icon: SiX,
    url: "https://twitter.com/yourusername",
    color: "#000",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:vk5400310@gmail.com",
    color: "#ea4335",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1f6b2435-a907-41ca-a672-ef4544e53c61",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Message from ${formState.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully! I will get back to you soon.");
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error sending message. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ 
        background: "var(--bg-secondary)",
        paddingTop: "80px",
        paddingBottom: "120px"
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Together"
        />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {/* Left — Info */}
          <div>
            <Reveal>
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Get in Touch
                </h3>
                
                <div className="h-6" />

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  I&apos;m currently available for freelance work and open to new opportunities.
                  Whether you have a project, an idea, or just want to connect — drop me a
                  message!
                </p>

                <div className="h-14" />

                <div className="space-y-6">
                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Mail size={16} style={{ color: "#10b981" }} />
                    vk5400310@gmail.com
                  </div>
                  <div
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <MapPin size={16} style={{ color: "#10b981" }} />
                    India
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="h-6" />

            <Reveal delay={0.15}>
              <div>
                <h4
                  className="text-sm font-semibold mb-8 tracking-wider uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Find me on
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -4,
                        borderColor: "var(--accent)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon
                        style={{ fontSize: 18, color: "var(--text-secondary)" }}
                      />
                      {/* Tooltip */}
                      <div
                        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        {social.name}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="h-4" />

              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="h-4" />

              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  className="form-input min-h-[140px] resize-none"
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                />
              </div>

              <div className="h-6" />

              <motion.button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-3 px-10 rounded-2xl text-white font-bold text-lg tracking-widest disabled:opacity-60 shadow-xl"
                style={{ 
                  background: "var(--gradient-accent)",
                  paddingTop: "18px",
                  paddingBottom: "18px"
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSending ? (
                  <motion.div
                    className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
