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
        "z-10 flex size-24 items-center justify-center rounded-full border-2 border-white bg-white p-2 shadow-none overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function NiftyLiveBeam() {
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
      {/* Left Circle: logo4 */}
      <Circle ref={div1Ref} className="p-0">
        <img
          src="/images/logo4.png"
          alt="Nifty50 Logo"
          className="w-full h-full object-contain scale-[1.4]"
        />
      </Circle>

      {/* Right Circle: logo3 */}
      <Circle ref={div2Ref}>
        <img
          src="/images/logo3.png"
          alt="NSE Tracker Logo"
          className="w-full h-full object-contain"
        />
      </Circle>

      {/* Beam 1: Left → Right */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
        gradientStartColor="#f59e0b"
        gradientStopColor="#ef4444"
      />
      {/* Beam 2: Right → Left (reverse) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={20}
        reverse
        gradientStartColor="#ef4444"
        gradientStopColor="#f59e0b"
      />
    </div>
  );
}
