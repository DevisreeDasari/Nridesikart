"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Users, Target, Heart, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/PillNav";
import ShootingStarsThemed from "@/components/ShootingStarsThemed";

export default function AboutPage() {
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
            className="w-[44px] h-[44px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform shadow-lg border-2 border-orange-300 dark:border-orange-500"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-6 py-2 h-[44px] flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-400 font-semibold text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-2 h-[44px] flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              About Nridesikart
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Your trusted bridge to India, offering authentic Indian services
              to Non-Resident Indians living in the USA.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-white/50 dark:bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Founded in 2024, Nridesikart was born from a simple observation: NRIs often struggle 
                  to access reliable services back home in India. Whether it&apos;s securing life insurance, 
                  getting custom tailoring done, investing in real estate, or buying/selling vehicles — 
                  the distance makes everything complicated.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We bridge that gap. Our team of dedicated professionals in both the USA and India 
                  ensures seamless service delivery, bringing the comfort and reliability of Indian 
                  services right to your doorstep in America.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600">
                <div className="text-6xl font-bold text-orange-600 dark:text-orange-400 mb-4">2024</div>
                <p className="text-xl text-gray-700 dark:text-gray-300">Year Founded</p>
                <div className="mt-6 pt-6 border-t border-orange-200 dark:border-orange-600">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">5000+</div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">Happy Customers Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trust</h3>
                <p className="text-gray-700 dark:text-gray-300">Building lasting relationships through honesty and transparency</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quality</h3>
                <p className="text-gray-700 dark:text-gray-300">Delivering excellence in every service we provide</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community</h3>
                <p className="text-gray-700 dark:text-gray-300">Strengthening the NRI community connection with India</p>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 text-center hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Reach</h3>
                <p className="text-gray-700 dark:text-gray-300">Serving 50+ cities across India with local expertise</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of NRIs who trust Nridesikart for their Indian service needs
          </p>
          <Link
            href="/services"
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105 inline-block"
          >
            Explore Our Services →
          </Link>
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
