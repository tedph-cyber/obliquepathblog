"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "grid" | "particles" | "circuits";

interface TechBackgroundProps {
  variant?: Variant;
  opacity?: number;
  interactive?: boolean;
  density?: "low" | "medium" | "high";
}

export function TechBackground({
  variant = "particles",
  opacity = 0.05,
  interactive = true,
  density = "medium",
}: TechBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  const variants = {
    grid: <GridVariant mousePos={mousePos} opacity={opacity} interactive={interactive} />,
    particles: <ParticlesVariant mousePos={mousePos} opacity={opacity} interactive={interactive} density={density} />,
    circuits: <CircuitsVariant mousePos={mousePos} opacity={opacity} interactive={interactive} />,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {variants[variant]}
    </div>
  );
}

function GridVariant({ mousePos, opacity, interactive }: { mousePos: { x: number; y: number }; opacity: number; interactive: boolean }) {
  const lines = 20;
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);
  
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" opacity={opacity} />
      
      {/* Animated lines */}
      {Array.from({ length: lines }).map((_, i) => {
        const distance = interactive ? Math.sqrt(
          Math.pow((i / lines) * dimensions.width - mousePos.x, 2) +
          Math.pow((i / lines) * dimensions.height - mousePos.y, 2)
        ) : 1000;
        const proximity = Math.max(0, 1 - distance / 300);
        
        return (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={(i / lines) * 100 + "%"}
            x2="100%"
            y2={(i / lines) * 100 + "%"}
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{
              opacity: opacity + proximity * 0.3,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.02,
            }}
          />
        );
      })}
    </svg>
  );
}

function ParticlesVariant({ 
  mousePos, 
  opacity, 
  interactive, 
  density 
}: { 
  mousePos: { x: number; y: number }; 
  opacity: number; 
  interactive: boolean;
  density: "low" | "medium" | "high";
}) {
  const counts = { low: 30, medium: 60, high: 100 };
  const particleCount = counts[density];
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      {particles.map((particle) => {
        const distance = interactive ? Math.sqrt(
          Math.pow((particle.x / 100) * dimensions.width - mousePos.x, 2) +
          Math.pow((particle.y / 100) * dimensions.height - mousePos.y, 2)
        ) : 1000;
        const proximity = Math.max(0, 1 - distance / 200);

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [opacity, opacity + 0.02, opacity],
              y: [-20, 20, -20],
              scale: [1, 1 + proximity * 0.5, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

function CircuitsVariant({ mousePos, opacity, interactive }: { mousePos: { x: number; y: number }; opacity: number; interactive: boolean }) {
  const circuits = [
    { d: "M10,10 Q50,50 100,10 T190,10", nodes: [[10, 10], [100, 10], [190, 10]] },
    { d: "M200,100 Q250,150 300,100 T390,100", nodes: [[200, 100], [300, 100], [390, 100]] },
    { d: "M50,200 Q100,250 150,200 T250,200", nodes: [[50, 200], [150, 200], [250, 200]] },
    { d: "M300,300 Q350,350 400,300 T490,300", nodes: [[300, 300], [400, 300], [490, 300]] },
  ];

  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary-500)" />
          <stop offset="100%" stopColor="var(--color-accent-500)" />
        </linearGradient>
      </defs>

      {circuits.map((circuit, i) => {
        const pathLength = 200;
        
        return (
          <g key={i}>
            <motion.path
              d={circuit.d}
              fill="none"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              opacity={opacity * 2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            
            {circuit.nodes.map((node, j) => {
              const distance = interactive ? Math.sqrt(
                Math.pow(node[0] - mousePos.x, 2) +
                Math.pow(node[1] - mousePos.y, 2)
              ) : 1000;
              const proximity = Math.max(0, 1 - distance / 150);

              return (
                <motion.circle
                  key={`${i}-${j}`}
                  cx={node[0]}
                  cy={node[1]}
                  r={3}
                  fill="var(--color-primary-500)"
                  animate={{
                    opacity: [opacity * 2, opacity * 2 + proximity * 0.5, opacity * 2],
                    scale: [1, 1 + proximity * 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
