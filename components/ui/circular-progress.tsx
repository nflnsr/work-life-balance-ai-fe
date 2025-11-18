"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CircularProgress({
  value,
  className,
  circularResponsive,
}: {
  value: number;
  className?: string;
  circularResponsive?: boolean;
}) {
  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const safe = Math.min(100, Math.max(0, value));
    const timer = requestAnimationFrame(() => setDisplayValue(safe));
    return () => cancelAnimationFrame(timer);
  }, [value]);

  const offset = circumference * (1 - displayValue / 100);

  return (
    <div className={cn("relative h-40 w-40", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-current text-muted"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          className="transition-all duration-[2000ms] ease-in-out"
          fill="transparent"
          strokeLinecap="round"
          stroke={
            displayValue >= 75
              ? "#22c55e"
              : displayValue >= 50
                ? "#f59e0b"
                : "#ef4444"
          }
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 2s ease, stroke 2s ease",
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            circularResponsive ? "text-xl xl:text-4xl font-bold" : "text-4xl font-bold",
            value >= 75
              ? "text-green-500"
              : value >= 50
                ? "text-amber-500"
                : "text-red-600",
          )}
        >
          {value}
        </span>
        <span className={`text-muted-foreground ${circularResponsive ? "md:text-xs xl:text-sm " : "text-sm"}`}>Good</span>
      </div>
    </div>
  );
}
