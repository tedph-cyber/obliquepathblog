"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface MouseSpotlightProps {
  size?: number;
  opacity?: number;
  color?: string;
}

export function MouseSpotlight({
  size = 400,
  opacity = 0.07,
  color = "var(--color-primary-500)",
}: MouseSpotlightProps) {
  const [isVisible, setIsVisible] = useState(false);
  const springConfig = { mass: 0.1, stiffness: 800, damping: 30 };
  
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 gpu-accelerate"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        filter: "blur(100px)",
      }}
      animate={{
        opacity: isVisible ? opacity : 0,
      }}
      transition={{ duration: 0.3 }}
    />
  );
}
