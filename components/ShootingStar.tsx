"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ShootingStarProps {
  delay?: number;
  duration?: number;
  color?: string;
}

const ShootingStar: React.FC<ShootingStarProps> = ({
  delay = 0,
  duration = 2,
  color = "rgba(255, 255, 255, 0.8)"
}) => {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starRef.current) return;

    const animateStar = () => {
      const startX = Math.random() * window.innerWidth;
      const startY = -50;
      const endX = startX - window.innerWidth * 0.3;
      const endY = window.innerHeight + 50;

      gsap.set(starRef.current, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0
      });

      gsap.to(starRef.current, {
        x: endX,
        y: endY,
        opacity: 1,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: "none",
        onComplete: () => {
          setTimeout(animateStar, Math.random() * 5000 + 3000);
        }
      });

      gsap.to(starRef.current, {
        opacity: 0,
        duration: duration * 0.3,
        delay: delay + duration * 0.7,
        ease: "power2.in"
      });
    };

    animateStar();
  }, [delay, duration]);

  return (
    <div
      ref={starRef}
      className="absolute pointer-events-none"
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 20px 6px ${color}, 0 0 40px 10px ${color}`
      }}
    >
      <div
        className="absolute"
        style={{
          width: "180px",
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${color})`,
          transform: "translateX(-180px)",
          filter: "blur(1px)"
        }}
      />
    </div>
  );
};

export default ShootingStar;
