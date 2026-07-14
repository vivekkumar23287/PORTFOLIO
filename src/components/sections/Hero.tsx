"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, Mail, Sparkles } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Creative Coder",
  "Tech Explorer",
];

export default function Hero({ onHireMe }: { onHireMe: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [randomPaths, setRandomPaths] = useState(() =>
    Array.from({ length: 10 }).map(() => ({
      x: ["0vw", "0vw", "0vw", "0vw"],
      y: ["0vh", "0vh", "0vh", "0vh"],
      rotate: [0, 360],
      duration: 30,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setRandomPaths(
        Array.from({ length: 10 }).map(() => ({
          x: [
            "0vw",
            `${(Math.random() - 0.5) * 160}vw`,
            `${(Math.random() - 0.5) * 160}vw`,
            "0vw",
          ],
          y: [
            "0vh",
            `${(Math.random() - 0.5) * 120}vh`,
            `${(Math.random() - 0.5) * 120}vh`,
            "0vh",
          ],
          rotate: [0, Math.random() * 180, Math.random() * 360, 360],
          duration: 25 + Math.random() * 20,
        }))
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const bgEl = bgRef.current;
    if (!bgEl) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      bgEl.style.setProperty("--mouse-x", `${x}`);
      bgEl.style.setProperty("--mouse-y", `${y}`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-greeting", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          ".hero-name-char",
          {
            y: 80,
            opacity: 0,
            rotateX: -40,
            duration: 0.9,
            stagger: 0.04,
          },
          "-=0.4"
        )
        .from(
          ".hero-role",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: -10,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".hero-floating-element",
          {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nameChars = "Vivek Kumar".split("");

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >

      <div
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
        style={{
          background: `
            radial-gradient(600px circle at calc(50% + var(--mouse-x, 0) * 8%) calc(50% + var(--mouse-y, 0) * 8%), var(--accent-glow) 0%, transparent 60%),
            radial-gradient(800px circle at calc(70% + var(--mouse-x, 0) * 5%) calc(30% + var(--mouse-y, 0) * 5%), rgba(139, 92, 246, 0.06) 0%, transparent 60%),
            radial-gradient(400px circle at calc(30% - var(--mouse-x, 0) * 3%) calc(70% - var(--mouse-y, 0) * 3%), rgba(236, 72, 153, 0.04) 0%, transparent 60%)
          `,
        } as React.CSSProperties}
      />


      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />


      {!isMobile && (
        <>
          <motion.div
            className="hero-floating-element absolute top-[10%] left-[10%] w-20 h-20 rounded-2xl opacity-20"
            style={{ background: "var(--gradient-accent)" }}
            animate={{
              x: randomPaths[0].x,
              y: randomPaths[0].y,
              rotate: randomPaths[0].rotate,
            }}
            transition={{ duration: randomPaths[0].duration, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-floating-element absolute top-[20%] right-[15%] w-3 h-3 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{
              x: randomPaths[1].x,
              y: randomPaths[1].y,
            }}
            transition={{ duration: randomPaths[1].duration, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-floating-element absolute bottom-[15%] left-[20%] w-4 h-4 rounded-full opacity-30"
            style={{ background: "var(--accent)" }}
            animate={{
              x: randomPaths[2].x,
              y: randomPaths[2].y,
            }}
            transition={{ duration: randomPaths[2].duration, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-floating-element absolute bottom-[20%] right-[10%] w-16 h-16 rounded-xl opacity-10"
            style={{ border: "2px solid var(--accent)" }}
            animate={{
              x: randomPaths[3].x,
              y: randomPaths[3].y,
              rotate: randomPaths[3].rotate,
            }}
            transition={{ duration: randomPaths[3].duration, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-floating-element absolute top-[50%] left-[5%] w-2 h-2 rounded-full opacity-40"
            style={{ background: "var(--accent)" }}
            animate={{
              x: randomPaths[4].x,
              y: randomPaths[4].y,
            }}
            transition={{ duration: randomPaths[4].duration, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-floating-element absolute top-[15%] right-[30%] w-6 h-6 rounded-lg opacity-15"
            style={{ background: "var(--gradient-accent)" }}
            animate={{
              x: randomPaths[5].x,
              y: randomPaths[5].y,
              rotate: randomPaths[5].rotate,
            }}
            transition={{ duration: randomPaths[5].duration, repeat: Infinity, ease: "linear" }}
          />


          <motion.div
            className="hero-floating-element absolute top-[30%] left-[35%] opacity-15"
            style={{ color: "#10b981" }}
            animate={{
              x: randomPaths[6].x,
              y: randomPaths[6].y,
              rotate: randomPaths[6].rotate,
            }}
            transition={{ duration: randomPaths[6].duration, repeat: Infinity, ease: "linear" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </motion.div>


          <motion.div
            className="hero-floating-element absolute top-[45%] right-[25%] w-24 h-8 rounded-full shadow-2xl"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(16px)"
            }}
            animate={{
              x: randomPaths[7].x,
              y: randomPaths[7].y,
              rotate: randomPaths[7].rotate,
            }}
            transition={{ duration: randomPaths[7].duration, repeat: Infinity, ease: "linear" }}
          />


          <motion.div
            className="hero-floating-element absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "var(--accent)",
              opacity: 0.05,
              filter: "blur(100px)",
            }}
            animate={{
              x: randomPaths[8].x,
              y: randomPaths[8].y,
            }}
            transition={{ duration: randomPaths[8].duration * 1.5, repeat: Infinity, ease: "linear" }}
          />


          <motion.div
            className="hero-floating-element absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "var(--gradient-accent)",
              opacity: 0.04,
              filter: "blur(120px)",
            }}
            animate={{
              x: randomPaths[9].x,
              y: randomPaths[9].y,
            }}
            transition={{ duration: randomPaths[9].duration * 1.5, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}


      <div className="section-container relative z-10 text-center">

        <motion.div className="hero-greeting flex items-center justify-center gap-2 mb-6">
          <Sparkles size={16} style={{ color: "#10b981" }} />
          <span
            className="text-sm font-medium tracking-[0.2em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Hello, I&apos;m
          </span>
          <Sparkles size={16} style={{ color: "#10b981" }} />
        </motion.div>

        {/* Name — character-by-character reveal */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6"
          style={{ perspective: "800px" }}
        >
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-name-char inline-block"
              style={{
                color: char === " " ? undefined : "var(--text-primary)",
                fontWeight: 800,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Animated role */}
        <div className="hero-role h-10 mb-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl font-medium gradient-text block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>


        <div className="w-full flex justify-center mb-12">
          <p
            className="hero-description max-w-xl text-center text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I craft elegant digital experiences with clean code, thoughtful
            design, and a passion for bringing ideas to life on the web.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ marginTop: "48px" }}>

          <motion.button
            onClick={onHireMe}
            className="hero-cta group relative inline-flex overflow-hidden rounded-full p-[2px] w-full sm:w-[180px] h-[52px] shadow-2xl"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
              style={{ background: "conic-gradient(from 90deg at 50% 50%, var(--bg-primary) 0%, #10b981 50%, var(--bg-primary) 100%)" }}
            />
            <span
              className="inline-flex h-full w-full items-center justify-center rounded-full text-[13px] font-bold uppercase tracking-widest gap-2.5 transition-colors duration-300 relative z-10"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
            >
              <Mail size={16} style={{ color: "#10b981" }} className="group-hover:scale-110 transition-transform duration-300" />
              Hire Me
            </span>
          </motion.button>


          <motion.button
            onClick={scrollToProjects}
            className="hero-cta group relative inline-flex items-center justify-center overflow-hidden rounded-full w-full sm:w-[180px] h-[52px] shadow-xl"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(20px)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
              style={{ background: "var(--gradient-accent)" }}
            />
            <span
              className="relative z-10 flex items-center justify-center gap-2.5 text-[13px] font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300"
              style={{ color: "var(--text-primary)" }}
            >
              View Projects
              <ArrowDown size={16} className="group-hover:text-white transition-colors duration-300" style={{ color: "#10b981" }} />
            </span>
          </motion.button>
        </div>
      </div>


      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span
          className="text-[9px] font-medium tracking-[0.4em] uppercase mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          Scroll
        </span>

        {/* The Track */}
        <div
          className="relative w-[1px] h-[24px] overflow-hidden"
          style={{ background: "var(--border-hover)" }}
        >
          {/* The dropping line */}
          <motion.div
            className="absolute top-0 w-full h-[80%]"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
            }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
