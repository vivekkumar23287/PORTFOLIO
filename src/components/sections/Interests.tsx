"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Gamepad2,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

interface Interest {
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  gradient: string;
}

const interests: Interest[] = [
  {
    name: "Online Gaming",
    description: "Strategy games and competitive play fuel my focus and reaction time.",
    icon: Gamepad2,
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    name: "Design",
    description: "Obsessed with clean layouts, typography, and premium visual aesthetics.",
    icon: Palette,
    gradient: "linear-gradient(135deg, #a855f7, #6366f1)",
  },
  {
    name: "Hardware Care",
    description: "Deep cleaning my tech—mouse, keyboard, laptop, and mobile for a fresh feel.",
    icon: Zap,
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    name: "Digital Zen",
    description: "Software decluttering: deleting unused images, docs, and apps for peak speed.",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #10b981, #059669)",
  },
];

export default function Interests() {
  return (
    <section
      id="interests"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "120px"
      }}
    >
      <div className="section-container relative z-10">
        <SectionHeading
          label="Interests"
          title="Beyond the Code"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {interests.map((interest, i) => (
            <InterestCard key={interest.name} interest={interest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestCard({
  interest,
  index,
}: {
  interest: Interest;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl text-center shadow-md cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "36px",
        transition: "box-shadow 0.3s ease-out, border-color 0.3s ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
    >
      <div className="relative">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
          style={{ background: interest.gradient }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <interest.icon size={26} style={{ color: "white" }} />
        </motion.div>

        <h4
          className="text-sm font-bold mb-1.5"
          style={{ color: "var(--text-primary)" }}
        >
          {interest.name}
        </h4>
        <p
          className="text-xs leading-relaxed hidden sm:block"
          style={{ color: "var(--text-muted)" }}
        >
          {interest.description}
        </p>
      </div>
    </motion.div>
  );
}
