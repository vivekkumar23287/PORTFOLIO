"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ExternalLink, Star, MousePointer2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SmartCareerBeam from "./SmartCareerBeam";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  adminUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  gradient: string;
  emoji: string;
  useBeam?: boolean;
  screenshots?: string[];
}

const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description:
      "A premium, highly interactive portfolio website built from scratch. Features smooth scroll animations, glassmorphism design, and a fully responsive layout.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "GSAP"],
    liveUrl: "https://your-portfolio-url.com", // You can update this once deployed
    githubUrl: "https://github.com/vivekkumar23287/portfolio", // Replace with actual repo if public
    featured: true,
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    emoji: "✨",
    screenshots: [
      "/images/PORTFOLIO IMAGE 1.png",
      "/images/PORTFOLIO IMAGE 2.png",
      "/images/PORTFOLIO IMAGE 3.png",
      "/images/PORTFOLIO IMAGE 4.png",
    ],
  },
  {
    title: "Smart Career Automation System",
    description:
      "A comprehensive platform designed to automate career-related processes. Built alongside a dedicated admin portal for database management and system oversight.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://your-main-site.com", // Add actual live link
    adminUrl: "https://your-admin-site.com", // Add actual admin link
    githubUrl: "https://github.com/vivekkumar23287/Smart-Career-Automation.git",
    featured: true,
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    emoji: "🚀",
    useBeam: true,
    screenshots: [
      "/images/SMART IMAGE 1.png", // Left (1)
      "/images/SMART IMAGE 2.png", // Middle (2)
      "/images/SMART IMAGE 3.png", // Right (3)
      "/images/SMART IMAGE 4.png", // Default (4)
    ],
  },
  {
    title: "Nifty50 Live Tracker (In Progress)",
    description:
      "A financial dashboard providing live prices and interactive charts for NSE Nifty50 and top 5 companies. Features integrated Excel support with download capabilities. (More details to be added).",
    technologies: ["React", "API Integration", "Chart.js", "ExcelJS"],
    liveUrl: "#", // Update with actual link later
    githubUrl: "#", // Update with actual link later
    featured: false,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    emoji: "📈",
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ 
        background: "var(--bg-secondary)",
        paddingTop: "30px",
        paddingBottom: "120px"
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[150px] pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
        />

        {/* Unified Project List */}
        <div className="flex flex-col items-center gap-12 mt-12 w-full">
          {projects.map((project, index) => (
            <div key={index} className="w-[85vw] md:w-[420px] lg:w-[480px] xl:w-[500px] flex flex-col">
              <FeaturedProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project, index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  // Custom scroll animation tracking the entire time the card is on screen
  // start end = Top of card hits bottom of screen (0 progress)
  // end start = Bottom of card hits top of screen (1 progress)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Add buttery smooth spring physics to the scroll progress
  // This causes the animation to gracefully lag behind the user's scroll and coast to a stop
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Determine slide direction based on index.
  // 1st Card (index 0): back card goes left (-55%)
  // 2nd Card (index 1): back card goes right (55%)
  // 3rd Card (index 2): back card goes left (-55%)
  const isEven = index !== undefined && index % 2 === 0;
  const backCardTarget = isEven ? "-55%" : "55%";
  const frontCardTarget = isEven ? "55%" : "-55%";

  // At 25% of journey: start sliding out
  // At 40% of journey: completely out
  // At 40% -> 60% of journey: stay completely out (while in center of screen)
  // At 60% of journey: start sliding back in
  // At 75% of journey: completely hidden again (0%)
  const backCardX = useTransform(
    smoothProgress, 
    [0, 0.25, 0.4, 0.6, 0.75, 1], 
    ["0%", "0%", backCardTarget, backCardTarget, "0%", "0%"]
  );

  const frontCardX = useTransform(
    smoothProgress, 
    [0, 0.25, 0.4, 0.6, 0.75, 1], 
    project.screenshots ? ["0%", "0%", frontCardTarget, frontCardTarget, "0%", "0%"] : ["0%", "0%", "0%", "0%", "0%", "0%"]
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="relative w-full h-full" ref={ref}>
      
      {/* The Screenshot Card (Back Card) */}
      {project.screenshots && (
        <motion.div
          className="absolute left-0 right-0 top-1/2 w-full rounded-3xl z-0 overflow-hidden shadow-2xl"
          style={{
            x: backCardX,
            y: "-50%",
            aspectRatio: "16 / 9",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            transformOrigin: "bottom left",
          }}
        >
          <ScreenshotGallery images={project.screenshots} />
        </motion.div>
      )}

      {/* Main Card (Front Card) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={handleMouseMove}
        className="relative z-10 rounded-3xl group overflow-hidden flex flex-col h-full flex-grow shadow-xl"
        style={{
          x: frontCardX,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "12px 36px 36px 36px",
        }}
      >
      {/* Mouse-follow light effect */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-2 items-start h-full flex-grow">
        {/* Preview */}
        {project.useBeam ? (
          <div className="w-full shrink-0">
            <SmartCareerBeam />
          </div>
        ) : (
          <div
            className="w-full h-[240px] rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: project.gradient }}
          >
            <span className="text-8xl">{project.emoji}</span>
          </div>
        )}

        <div className="flex-1 flex flex-col w-full h-full">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} style={{ color: "#10b981" }} fill="#10b981" />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#10b981" }}>
              Featured Project
            </span>
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="h-6" />

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white w-full sm:w-auto"
                style={{ 
                  background: "var(--gradient-accent)",
                  padding: "10px 24px"
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={16} /> Live Demo
              </motion.a>
            )}
            {project.adminUrl && (
              <motion.a
                href={project.adminUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white w-full sm:w-auto"
                style={{ 
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  padding: "10px 24px"
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={16} /> Admin Portal
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 rounded-full text-sm font-semibold w-full sm:w-auto"
                style={{
                  border: "1.5px solid var(--border-hover)",
                  color: "var(--text-primary)",
                  padding: "10px 24px"
                }}
                whileHover={{ scale: 1.05, y: -2, borderColor: "var(--accent)" }}
                whileTap={{ scale: 0.97 }}
              >
                <SiGithub style={{ fontSize: 16 }} /> Source Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
}

function ScreenshotGallery({ images }: { images: string[] }) {
  // 3 = Default image (no hover)
  const [activeImg, setActiveImg] = useState(3);

  return (
    <div 
      className="relative w-full h-full"
      style={{ background: "#0a0a0a" }}
      onMouseLeave={() => setActiveImg(3)}
    >
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Screenshot preview ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out"
          style={{ opacity: activeImg === idx ? 1 : 0 }}
        />
      ))}
      
      {/* Premium instruction badge (fades out on hover) */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full z-20 pointer-events-none transition-all duration-500 flex items-center gap-2.5 shadow-2xl"
        style={{ 
          background: "rgba(10, 10, 10, 0.75)", 
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          opacity: activeImg === 3 ? 1 : 0,
          transform: activeImg === 3 ? "translate(-50%, 0) scale(1)" : "translate(-50%, 10px) scale(0.95)"
        }}
      >
        <MousePointer2 size={14} style={{ color: "var(--accent)" }} />
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-white/90">Hover to Explore Gallery</span>
      </div>

      {/* 3 Invisible Hover Zones with subtle dividers */}
      <div className="absolute inset-0 flex z-10">
        <div 
          className="flex-1 h-full cursor-crosshair border-r border-black/40" 
          onMouseEnter={() => setActiveImg(0)} 
        />
        <div 
          className="flex-1 h-full cursor-crosshair border-r border-black/40" 
          onMouseEnter={() => setActiveImg(1)} 
        />
        <div 
          className="flex-1 h-full cursor-crosshair" 
          onMouseEnter={() => setActiveImg(2)} 
        />
      </div>
    </div>
  );
}


