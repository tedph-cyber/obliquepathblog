"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, BarChart } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollWatcherProps {
  showProgress?: boolean;
  showScrollToTop?: boolean;
  showPercentage?: boolean;
  scrollToTopThreshold?: number;
  progressPosition?: "top" | "bottom";
}

export function ScrollWatcher({
  showProgress = true,
  showScrollToTop = true,
  showPercentage = true,
  scrollToTopThreshold = 300,
  progressPosition = "top",
}: ScrollWatcherProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollY, setScrollY] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowButton(currentScrollY > scrollToTopThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollToTopThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollPercentage = typeof document !== "undefined" 
    ? Math.round((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)
    : 0;

  return (
    <>
      {/* Progress Bar */}
      {showProgress && (
        <motion.div
          className={`fixed ${progressPosition === "top" ? "top-0" : "bottom-0"} left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-accent/60 origin-left z-50`}
          style={{ scaleX }}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <motion.button
          className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showButton ? 1 : 0,
            scale: showButton ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{
              rotate: isHovering ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {isHovering ? (
              <ArrowUp className="w-6 h-6" />
            ) : (
              <BarChart className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
      )}

      {/* Scroll Percentage Indicator */}
      {showPercentage && showButton && (
        <motion.div
          className="fixed bottom-8 left-8 px-4 py-2 rounded-full bg-muted/80 backdrop-blur-sm text-foreground font-mono text-sm z-50 hidden md:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
}
