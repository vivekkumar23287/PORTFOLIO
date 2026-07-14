"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading, Reveal } from "../ui/SectionHeading";
import { Code2, Coffee, Rocket, Heart } from "lucide-react";

const badges = [
  { icon: Code2, label: "Clean Code" },
  { icon: Coffee, label: "Coffee Driven" },
  { icon: Rocket, label: "Fast Learner" },
  { icon: Heart, label: "Passionate" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);


  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        paddingTop: "30px",
        paddingBottom: "60px"
      }}
    >

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          label="About Me"
          title="A Glimpse Into Who I Am"
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          <Reveal direction="left">
            <div className="relative group perspective-1000">

              <div
                className="absolute -inset-4 rounded-[2rem] opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
                style={{ background: "var(--accent)" }}
              />

              <motion.div
                className="relative w-full aspect-[4/5] max-w-[280px] sm:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >

                <Image
                  src="/images/USER IMAGE 2.png"
                  alt="Vivek Kumar Profile"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain object-bottom"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />


              </motion.div>
            </div>
          </Reveal>

          {/* Right — Content */}
          <div>
            <Reveal delay={0.1}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                My name is <strong style={{ color: "var(--text-primary)" }}>Vivek Kumar</strong>, and I am currently pursuing a B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence from GITA Autonomous College. I am passionate about technology and web development, and I enjoy building practical and user-friendly applications.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                I completed my 10th and 12th from Netaji Subhash Public School. I scored 61% in 10th and 52% in 12th. I believe that marks are not the only measure of a person&apos;s abilities, and I focus more on continuous learning and improving my practical skills. Currently, I maintain a CGPA of 7.1 in my engineering course.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                I have good knowledge of HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, and React.js. I have developed projects such as a personal portfolio website, an expense tracker application, and a chatbot-based ticketing system.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                Currently, I am working on a stock market project that uses APIs to display live NSE stock prices and analyze market trends in real time. This project has improved my skills in API integration and logic building.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "var(--text-secondary)" }}
              >
                I am also familiar with tools like VS Code, Git, GitHub, Windows, and Linux. My goal is to become a skilled software developer and continue learning new technologies.
              </p>
            </Reveal>


            <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 sm:mt-6">
              {badges.map((badge, i) => (
                <Reveal key={badge.label} delay={0.35 + i * 0.1}>
                  <motion.div
                    className="flex items-center gap-3 sm:gap-4 rounded-full text-sm sm:text-base font-medium group cursor-pointer shrink-0"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      boxShadow: "var(--shadow-sm)",
                      padding: "10px 20px",
                      transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div
                      className="flex items-center justify-center p-3 rounded-full transition-colors duration-500 shadow-sm shrink-0"
                      style={{ background: "var(--accent-glow)" }}
                    >
                      <badge.icon
                        size={20}
                        className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
                        style={{ color: "#10b981" }}
                      />
                    </div>
                    <span className="whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                      {badge.label}
                    </span>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
