"use client";

import { useEffect, useState } from "react";
import { TechBackground } from "./tech-background";

type Variant = "grid" | "particles" | "circuits";

export function DynamicBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBgVariant = (): Variant => {
    if (scrollY < 300) return "grid";
    if (scrollY < 1000) return "particles";
    return "circuits";
  };

  return <TechBackground variant={getBgVariant()} density="medium" opacity={0.05} interactive />;
}
