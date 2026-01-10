"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: NavItem[];
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  className?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  ease = "power2.easeOut",
  baseColor = "#000000",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#000000",
  className
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current || !pillRef.current) return;

    const links = navRef.current.querySelectorAll("a");
    const pill = pillRef.current;

    const updatePill = (index: number) => {
      const link = links[index];
      if (!link) return;

      const linkRect = link.getBoundingClientRect();
      const navRect = navRef.current!.getBoundingClientRect();

      gsap.to(pill, {
        width: linkRect.width,
        x: linkRect.left - navRect.left,
        duration: 0.5,
        ease: ease
      });
    };

    updatePill(activeIndex);

    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => updatePill(index));
    });

    navRef.current.addEventListener("mouseleave", () => updatePill(activeIndex));

    return () => {
      links.forEach((link, index) => {
        link.removeEventListener("mouseenter", () => updatePill(index));
      });
    };
  }, [activeIndex, ease]);

  return (
    <>
      {/* Desktop Navigation */}
      <div
        ref={navRef}
        className={cn("hidden md:flex relative items-center gap-[3px] p-[3px] rounded-[50px]", className)}
        style={{
          backgroundColor: baseColor,
          border: `2px solid ${baseColor}`
        }}
      >
        <div
          ref={pillRef}
          className="absolute h-[calc(100%-6px)] rounded-[50px] transition-all"
          style={{ backgroundColor: pillColor }}
        />

        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setActiveIndex(index)}
            className="relative z-10 py-2 px-6 text-[15px] font-medium rounded-[50px] transition-colors duration-300"
            style={{
              color: activeIndex === index ? hoveredPillTextColor : pillTextColor
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-[1003] w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[1001]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-64 z-[1002] transition-transform duration-300",
          "bg-white dark:bg-gray-900 shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-20 px-4">
          <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
            {items.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "block py-3 px-4 text-[16px] font-medium rounded-lg transition-all",
                    activeIndex === index
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Auth Buttons in Mobile Menu */}
            <li className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <Link
                href="/sign-in"
                className="block py-3 px-4 text-[16px] font-medium rounded-lg text-center bg-transparent text-orange-600 dark:text-orange-400 border-2 border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/sign-up"
                className="block py-3 px-4 text-[16px] font-medium rounded-lg text-center bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PillNav;
