"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative py-8 border-t"
      style={{
        background: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="section-container">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <motion.p
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Vivek Kumar • Designed & Built by Vivek Kumar
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
