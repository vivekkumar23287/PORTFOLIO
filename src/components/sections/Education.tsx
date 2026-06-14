"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  highlights: string[];
}

const education: EducationItem[] = [
  {
    degree: "B.TECH Computer Science and Engineering with AI",
    institution: "GITA AUTONOMOUS COLLEGE",
    location: "BHUBANESWAR, INDIA",
    period: "2022 - 2026 (On Going)",
    grade: "SCGPA: 7.10",
    highlights: [
      "Specialization in Artificial Intelligence",
      "Focusing on advanced algorithms, machine learning, and core computer science principles.",
    ],
  },
  {
    degree: "Class (XII th) - CBSE Board",
    institution: "NETAJI SUBHAS PUBLIC SCHOOL",
    location: "JAMSHEDPUR, INDIA",
    period: "2021 - 2022",
    grade: "Score: 52.80%",
    highlights: [
      "Higher secondary education focused on core science subjects.",
      "Developed foundational knowledge in mathematics and science.",
    ],
  },
  {
    degree: "Class (X th) - CBSE Board",
    institution: "NETAJI SUBHAS PUBLIC SCHOOL",
    location: "JAMSHEDPUR, INDIA",
    period: "2019 - 2020",
    grade: "Score: 61.20%",
    highlights: [
      "Completed secondary education under CBSE curriculum.",
      "Participated actively in school events and extracurriculars.",
    ],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "120px"
      }}
    >
      <div className="section-container relative z-10">
        <SectionHeading
          label="Education"
          title="Academic Journey"
        />

        <div className="max-w-4xl mx-auto flex flex-col" style={{ gap: "48px" }}>
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  education: edu,
  index,
}: {
  education: EducationItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    hover: {
      y: -4,
      boxShadow: "var(--shadow-lg)",
      borderColor: "var(--accent)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="group relative rounded-3xl shadow-lg cursor-pointer"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        padding: "36px",
      }}
    >
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex gap-4">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "var(--accent-glow)",
              }}
            >
              <GraduationCap size={22} style={{ color: "#10b981" }} />
            </div>

            <div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {edu.degree}
              </h3>
              <p
                className="text-sm font-medium mb-1 gradient-text"
              >
                {edu.institution}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MapPin size={12} />
                  {edu.location}
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Calendar size={12} />
                  {edu.period}
                </span>
              </div>
            </div>
          </div>

          {edu.grade && (
            <div
              className="flex flex-col items-end shrink-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award size={14} style={{ color: "#10b981" }} />
                <h4
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "#10b981" }}
                >
                  {edu.grade}
                </h4>
              </div>
            </div>
          )}
        </div>


        <div className="mt-4 ml-16 space-y-1.5">
          {edu.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: "var(--accent)" }}
              />
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
