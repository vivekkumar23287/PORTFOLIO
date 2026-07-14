"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

interface ProjectBeamProps {
  leftImg: string;
  leftAlt: string;
  leftScaleClass?: string;
  leftPaddingClass?: string;
  rightImg: string;
  rightAlt: string;
  rightScaleClass?: string;
  rightPaddingClass?: string;
  startColor: string;
  stopColor: string;
}

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

export default function ProjectBeam({
  leftImg,
  leftAlt,
  leftScaleClass,
  leftPaddingClass,
  rightImg,
  rightAlt,
  rightScaleClass,
  rightPaddingClass,
  startColor,
  stopColor,
}: ProjectBeamProps) {
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
      {/* Left Circle */}
      <Circle ref={div1Ref} className={leftPaddingClass}>
        <div className="relative w-full h-full">
          <Image
            src={leftImg}
            alt={leftAlt}
            fill
            sizes="96px"
            className={cn("object-contain", leftScaleClass)}
            priority
          />
        </div>
      </Circle>

      {/* Right Circle */}
      <Circle ref={div2Ref} className={rightPaddingClass}>
        <div className="relative w-full h-full">
          <Image
            src={rightImg}
            alt={rightAlt}
            fill
            sizes="96px"
            className={cn("object-contain", rightScaleClass)}
            priority
          />
        </div>
      </Circle>

      {/* Beam 1: Left → Right */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
        gradientStartColor={startColor}
        gradientStopColor={stopColor}
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
        gradientStartColor={stopColor}
        gradientStopColor={startColor}
      />
    </div>
  );
}
