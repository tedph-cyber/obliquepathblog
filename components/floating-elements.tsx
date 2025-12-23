"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElementsProps {
  count?: number;
  variant?: "circles" | "squares" | "mixed";
}

interface Element {
  id: number;
  x: number;
  y: number;
  size: number;
  shape: "circle" | "square";
  delay: number;
  duration: number;
  rotation: number;
}

export function FloatingElements({
  count = 6,
  variant = "mixed",
}: FloatingElementsProps) {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const generateElements = () => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5, // 5-95% to avoid edges
        y: Math.random() * 90 + 5,
        size: Math.random() * 100 + 50, // 50-150px
        shape: variant === "mixed" 
          ? (Math.random() > 0.5 ? "circle" : "square")
          : variant === "circles" ? "circle" : "square",
        delay: Math.random() * 2,
        duration: Math.random() * 5 + 5, // 5-10s
        rotation: Math.random() * 15, // 0-15 degrees
      })) as Element[];
    };

    setElements(generateElements());
  }, [count, variant]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute gpu-accelerate"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
            borderRadius: element.shape === "circle" ? "50%" : "20%",
            background:
              element.id % 2 === 0
                ? "linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%)"
                : "linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-700) 100%)",
            opacity: 0.4,
            filter: "blur(40px)",
          }}
          initial={{ 
            opacity: 0, 
            y: 0,
            rotate: 0,
          }}
          whileInView={{
            opacity: [0, 0.4, 0.4],
            y: [-30, 30, -30],
            rotate: element.shape === "square" ? [0, element.rotation, 0] : 0,
          }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
