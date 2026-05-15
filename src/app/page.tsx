"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import HireMeModal from "@/components/HireMeModal";

export default function Home() {
  const [hireMeOpen, setHireMeOpen] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="grain-overlay w-full">
          <Navbar />
          <main>
            <Hero onHireMe={() => setHireMeOpen(true)} />
            <About />
            <Experience />
            <Projects />
            <Education />
            <Skills />
            <Interests />
            <Contact />
          </main>
          <Footer />
          <HireMeModal
            isOpen={hireMeOpen}
            onClose={() => setHireMeOpen(false)}
          />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
