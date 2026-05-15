"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading, Reveal } from "../ui/SectionHeading";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostgresql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const ClerkIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    style={{ ...style, width: "1em", height: "1em" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-3c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm0-2c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
  </svg>
);

interface SkillGroup {
  category: string;
  skills: { name: string; level: number; icon: React.ComponentType<{ style?: React.CSSProperties }> }[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", level: 95, icon: SiHtml5 },
      { name: "CSS", level: 90, icon: SiCss },
      { name: "JavaScript", level: 92, icon: SiJavascript },
      { name: "TypeScript", level: 85, icon: SiTypescript },
      { name: "React.js", level: 90, icon: SiReact },
      { name: "Next.js", level: 85, icon: SiNextdotjs },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss },
      { name: "Bootstrap", level: 80, icon: SiBootstrap },
    ],
  },
  {
    category: "Backend & Databases",
    skills: [
      { name: "Node.js", level: 80, icon: SiNodedotjs },
      { name: "Python", level: 75, icon: SiPython },
      { name: "Neon DB", level: 70, icon: SiPostgresql },
      { name: "Clerk", level: 85, icon: ClerkIcon },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "VS Code", level: 90, icon: VscVscode },
      { name: "Git", level: 88, icon: SiGit },
      { name: "GitHub", level: 85, icon: SiGithub },
      { name: "Figma", level: 75, icon: SiFigma },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{ 
        background: "var(--bg-secondary)",
        paddingTop: "80px",
        paddingBottom: "120px"
      }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Skills"
          title="Tech Stack"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.1}>
              <div className="mb-8">
                <h3
                  className="text-lg font-bold mb-8 flex items-center gap-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {group.category}
                </h3>

                <div className="flex flex-col gap-6 md:gap-8">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <SkillBar
                        skill={skill}
                        delay={gi * 0.1 + si * 0.06}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Spacer to push technologies section down */}
        <div className="h-6 md:h-10" />

        {/* Floating tech icons grid */}
        <Reveal delay={0.3}>
          <div>
            <h3
              className="text-center text-sm font-semibold tracking-[0.2em] uppercase mb-14"
              style={{ color: "var(--text-muted)" }}
            >
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-4" style={{ paddingTop: '60px' }}>
              {skillGroups.flatMap(group => group.skills).map(
                (skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="group relative w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                    whileHover={{
                      scale: 1.2,
                      y: -8,
                      rotate: 5,
                      borderColor: "var(--accent)",
                      boxShadow: "0 8px 25px var(--accent-glow)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    <skill.icon
                      style={{ fontSize: 24, color: "var(--text-secondary)" }}
                    />
                    {/* Tooltip */}
                    <div
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      {skill.name}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillBar({
  skill,
  delay,
}: {
  skill: { name: string; level: number; icon: React.ComponentType<{ style?: React.CSSProperties }> };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="py-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <skill.icon style={{ fontSize: 16, color: "#10b981" }} />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar-track mt-4" style={{ height: "8px" }}>
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}
