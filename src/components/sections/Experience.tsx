"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Briefcase, MapPin, Calendar, FileText, ExternalLink } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  certificateLink?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Industrial Trainee",
    company: "TATA STEEL",
    location: "OFFLINE",
    period: "MAY 2024 – JULY 2024",
    description: [
      "Gained hands-on exposure to the ST Mill operations.",
      "Understood the complete workflow from raw material Input to final product output.",
      "Learned about industrial machinery, safety procedures, and Production monitoring.",
      "Experienced company facilities and safety protocols including AC monitoring rooms and safety gear.",
    ],
    technologies: [],
    certificateLink: "https://drive.google.com/file/d/1S9rAzCyww7UFoFsMqqVD7RpTtEXTcaue/view?usp=drive_link",
  },
  {
    role: "C++ Programming Intern",
    company: "InternPe",
    location: "ONLINE",
    period: "AUGUST 2024 – SEPTEMBER 2024",
    description: [
      "Completed a 4-week structured internship in C++ Programming.",
      "Gained experience in writing efficient, object-oriented C++ code.",
      "Understood core programming concepts such as data structures, memory management, and pointers.",
      "Enhanced problem-solving skills through assigned tasks and programming challenges.",
    ],
    technologies: [],
    certificateLink: "https://drive.google.com/file/d/10KMOkdI3aw5MjmwQB-h-n4egNV5qHJLm/view?usp=drive_link",
  },
  {
    role: "Web Development",
    company: "Dev Town",
    location: "ONLINE",
    period: "JULY 2025 - AUGUST 2025",
    description: [
      "Participated in a bootcamp focused on web development fundamentals.",
      "Built a static Netflix homepage clone using HTML only.",
      "Gained hands-on experience in designing and organizing content.",
      "Certificate issued by DevTown in collaboration with Microsoft Student Chapter.",
      "Improved skills in basic web design and project implementation.",
    ],
    technologies: [],
    certificateLink: "https://drive.google.com/file/d/1YlJ_HcVKMtKuVgatvFLLGMBmXUf6l8Cu/view?usp=drive_link",
  },
];

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const xPercent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const xVw = useTransform(scrollYProgress, [0, 1], [0, 100]);


  const transform = useMotionTemplate`translateX(calc(${xPercent}% + ${xVw}vw))`;

  return (
    <section
      id="experience"
      ref={targetRef}
      className="relative h-[300vh] md:h-[300vh]"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pb-8 md:pb-12">


        <div className="w-full flex justify-center px-6 shrink-0 z-10" style={{ paddingTop: "20px" }}>
          <div className="w-full max-w-7xl flex justify-center">
            <SectionHeading
              label="Experience"
              title="Where I've Worked"
              className="!mb-4"
            />
          </div>
        </div>


        <div className="flex-1 flex flex-col justify-start min-h-0 w-full -mt-4 sm:-mt-8 md:-mt-20">

          <motion.div
            style={{ transform, willChange: "transform" }}
            className="experience-track flex items-stretch gap-4 sm:gap-8 md:gap-16 pr-4 sm:pr-6 md:pr-[10vw] relative w-max"
          >

            {experiences.map((exp, index) => (
              <div key={index} className="w-[85vw] sm:w-[80vw] md:w-[420px] lg:w-[500px] xl:w-[580px] h-auto min-h-[320px] sm:min-h-[340px] md:min-h-[340px] lg:min-h-[350px] xl:min-h-[360px] shrink-0 flex flex-col">
                <div className="flex-1 w-full h-full">
                  <ExperienceCard experience={exp} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience: exp,
}: {
  experience: ExperienceItem;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative h-full flex flex-col"
    >


      <div
        className="relative flex flex-col rounded-3xl group h-full flex-grow overflow-hidden exp-card-hover"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "14px 14px",
        }}
      >

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 sm:min-h-[80px] shrink-0">
          <div>
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <span className="flex items-center gap-1.5 text-sm md:text-base font-medium gradient-text">
                <Briefcase size={16} />
                {exp.company}
              </span>
              <span
                className="flex items-center gap-1 text-xs md:text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <MapPin size={14} />
                {exp.location}
              </span>
            </div>
          </div>
          <span
            className="flex items-center gap-2 text-xs md:text-sm font-semibold rounded-full whitespace-nowrap shadow-sm"
            style={{
              background: "var(--accent-glow)",
              color: "#10b981",
              padding: "6px 12px",
            }}
          >
            <Calendar size={16} />
            {exp.period}
          </span>
        </div>


        <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 flex-grow list-none">
          {exp.description.map((desc, i) => (
            <li
              key={i}
              className="text-[12px] sm:text-[14px] md:text-[15px] leading-snug sm:leading-normal"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-3">

          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-sm"
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    padding: "6px 12px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}


          {exp.certificateLink && (
            <div style={{ marginTop: "6px", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <a
                href={exp.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full text-sm font-bold transition-all duration-300 group/link"
                style={{
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                  padding: "6px 14px",
                }}
              >
                <FileText size={16} style={{ color: "#10b981" }} />
                <span>View Certificate</span>
                <ExternalLink
                  size={14}
                  className="opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
