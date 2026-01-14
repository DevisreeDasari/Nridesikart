"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/PillNav";
import ShootingStarsThemed from "@/components/ShootingStarsThemed";
import AuthAvatarMenu from "@/components/AuthAvatarMenu";

export default function CartPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const currentTheme = resolvedTheme || theme;

  if (!mounted) {
    return null;
  }

  // Empty cart state for now
  const cartItems: Array<{ id: string; name: string; price: number; quantity: number }> = [];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Animated Background Stars */}
      <ShootingStarsThemed />

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        <Link
          href="/"
          className="absolute top-[1em] left-4 md:left-8 z-[1002] transition-transform hover:scale-110"
        >
          <Image
            src="/logo.svg"
            alt="Nridesikart Logo"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
        </Link>

        <div className="flex items-center justify-center py-4">
          <PillNav
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" }
            ]}
            ease="power2.easeOut"
            baseColor={currentTheme === "dark" ? "#1F2937" : "#FFFFFF"}
            pillColor={currentTheme === "dark" ? "#F97316" : "#FF6B35"}
            hoveredPillTextColor="#FFFFFF"
            pillTextColor={currentTheme === "dark" ? "#E5E7EB" : "#1F2937"}
          />
        </div>

        <div className="absolute top-[1em] right-4 md:right-8 flex items-center gap-3 z-[1002]">
          <button
            onClick={toggleTheme}
            className="w-[44px] h-[44px] rounded-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
          >
            {currentTheme === "light" ? (
              <Moon className="w-5 h-5 text-white" strokeWidth={2} />
            ) : (
              <Sun className="w-5 h-5 text-white" strokeWidth={2} />
            )}
          </button>

          <Link
            href="/cart"
            className="w-[44px] h-[44px] rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2} />
          </Link>

          <AuthAvatarMenu />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Your Cart
            </h1>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-8 px-4 md:px-8 lg:px-16 min-h-[50vh]">
          <div className="max-w-4xl mx-auto">
            {cartItems.length === 0 ? (
              // Empty Cart State
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-12 border-2 border-orange-200 dark:border-orange-600 text-center">
                <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your cart is empty
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Looks like you haven&apos;t added any services to your cart yet. 
                  Explore our services and find what you need!
                </p>
                <Link
                  href="/services"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Browse Services →
                </Link>
              </div>
            ) : (
              // Cart Items (for future implementation)
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-orange-600 dark:text-orange-400 font-bold">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                          <Minus className="w-4 h-4 text-orange-600" />
                        </button>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <button className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                          <Plus className="w-4 h-4 text-orange-600" />
                        </button>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-base mb-4">
            © 2024 Nridesikart. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
