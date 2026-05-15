"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-2 border-white bg-white p-2 shadow-none overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function SmartCareerBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full h-full items-center justify-between overflow-hidden rounded-2xl p-6"
      ref={containerRef}
      style={{
        minHeight: "160px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Left: Admin Portal */}
      <Circle ref={div1Ref}>
        <img src="/images/ADMIN.png" alt="Admin Portal" className="w-full h-full object-contain rounded-full" />
      </Circle>
      
      {/* Right: Smart Career System */}
      <Circle ref={div2Ref} className="p-0">
        <img src="/images/Logo.png" alt="Smart Career Logo" className="w-full h-full object-contain rounded-full scale-[1.7]" />
      </Circle>

      {/* Beam 1: Admin → Smart Career (top curve) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
        gradientStartColor="#6366f1"
        gradientStopColor="#10b981"
      />
      {/* Beam 2: Smart Career → Admin (bottom curve, reverse) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={20}
        reverse
        gradientStartColor="#10b981"
        gradientStopColor="#6366f1"
      />
    </div>
  );
}


