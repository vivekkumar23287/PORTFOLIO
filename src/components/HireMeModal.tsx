"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MessageCircle } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactOptions = [
  {
    label: "Email",
    description: "Send me an email directly",
    icon: Mail,
    color: "#ea4335",
    hoverBg: "rgba(234, 67, 53, 0.05)",
    borderGlow: "rgba(234, 67, 53, 0.3)",
    action: () => {

      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=vk5400310@gmail.com",
        "_blank"
      );
    },
  },
  {
    label: "WhatsApp",
    description: "Chat with me on WhatsApp",
    icon: MessageCircle,
    color: "#25d366",
    hoverBg: "rgba(37, 211, 102, 0.05)",
    borderGlow: "rgba(37, 211, 102, 0.3)",
    action: () => {
      window.open("https://wa.me/919470950144", "_blank");
    },
  },
  {
    label: "LinkedIn",
    description: "Connect on LinkedIn",
    icon: FaLinkedinIn,
    color: "#0077b5",
    hoverBg: "rgba(0, 119, 181, 0.05)",
    borderGlow: "rgba(0, 119, 181, 0.3)",
    action: () => {
      window.open("https://www.linkedin.com/in/vivekkumarr15911/", "_blank");
    },
  },
];

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >

          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(20px)",
            }}
          />


          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative w-full rounded-[2rem] overflow-hidden"
            style={{
              maxWidth: "480px",
              background: "var(--bg-primary)",
              border: "1px solid var(--border)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >

            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                boxShadow: "0 0 20px 2px var(--accent)",
              }}
            />


            <motion.button
              onClick={onClose}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center z-20 group"
              style={{
                top: "24px",
                right: "24px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={14} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Content Header */}
            <div style={{ padding: "40px 40px 24px 40px" }}>
              <motion.h3
                className="text-3xl font-bold tracking-tight mb-3 pr-8"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Let&apos;s Connect.
              </motion.h3>
              <motion.p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                My inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </motion.p>
            </div>


            <div style={{ padding: "0 40px 40px 40px" }} className="space-y-4">
              {contactOptions.map((option, i) => (
                <motion.button
                  key={option.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={option.action}
                  className="w-full group relative flex items-center gap-5 rounded-2xl text-left overflow-hidden transition-all duration-300"
                  style={{
                    padding: "16px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: option.hoverBg }}
                  />


                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `1px solid ${option.borderGlow}` }}
                  />


                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <option.icon
                      size={20}
                      className="transition-colors duration-300"
                      style={{ color: "var(--text-secondary)" }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <option.icon size={20} style={{ color: option.color }} />
                    </div>
                  </div>


                  <div className="relative z-10">
                    <div
                      className="font-semibold text-[15px] tracking-wide mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {option.label}
                    </div>
                    <div
                      className="text-[13px] font-medium tracking-wide"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {option.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
