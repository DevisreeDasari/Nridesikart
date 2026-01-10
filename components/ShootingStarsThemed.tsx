"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ShootingStar from "./ShootingStar";

const ShootingStarsThemed: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  // Bright neon colors for dark theme, deep saturated colors for light theme
  const starColors = isDark
    ? [
        "rgba(0, 217, 255, 1)",      // Bright Cyan
        "rgba(255, 0, 153, 1)",      // Hot Pink
        "rgba(204, 255, 0, 1)",      // Lime Green
        "rgba(255, 0, 255, 1)",      // Bright Magenta
        "rgba(255, 107, 53, 1)",     // Electric Orange
        "rgba(157, 0, 255, 1)",      // Electric Purple
        "rgba(255, 215, 0, 1)",      // Gold
        "rgba(0, 255, 127, 1)",      // Spring Green
      ]
    : [
        "rgba(0, 71, 171, 1)",       // Deep Cobalt Blue
        "rgba(180, 0, 0, 1)",        // Bright Red
        "rgba(0, 128, 0, 1)",        // Green
        "rgba(75, 0, 130, 1)",       // Indigo
        "rgba(139, 0, 0, 1)",        // Dark Red
        "rgba(0, 100, 100, 1)",      // Teal
        "rgba(128, 0, 128, 1)",      // Purple
        "rgba(255, 69, 0, 1)",       // Red-Orange
      ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Just 8 stars with staggered delays */}
      {starColors.slice(0, 8).map((color, i) => (
        <ShootingStar
          key={`star-${i}-${currentTheme}`}
          delay={i * 1.5}
          duration={2 + Math.random() * 1.5}
          color={color}
        />
      ))}
    </div>
  );
};

export default ShootingStarsThemed;
