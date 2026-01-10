"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Shield, Shirt, Home, Car } from "lucide-react";
import { useTheme } from "next-themes";
import ShootingStarsThemed from "@/components/ShootingStarsThemed";
import PillNav from "@/components/PillNav";

export default function LandingPage() {
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
        {/* Logo */}
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

        {/* Center Navigation */}
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

        {/* Right Section: Theme Toggle + Cart + Auth */}
        <div className="absolute top-[1em] right-4 md:right-8 flex items-center gap-3 z-[1002]">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-[44px] h-[44px] rounded-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
          >
            {currentTheme === "light" ? (
              <Moon className="w-5 h-5 text-white" strokeWidth={2} />
            ) : (
              <Sun className="w-5 h-5 text-white" strokeWidth={2} />
            )}
          </button>

          {/* Shopping Cart */}
          <Link
            href="/cart"
            className="w-[44px] h-[44px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform shadow-lg border-2 border-orange-300 dark:border-orange-500"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
          </Link>

          {/* Desktop Auth Buttons */}
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
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="inline-block px-6 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-300 dark:border-orange-600 mb-6">
            <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">
              🇮🇳 Connecting NRIs with India Since 2024
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Nridesikart
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
            Experience authentic Indian services from the comfort of your home in the USA
          </p>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            From life insurance to custom tailoring, real estate investments to automobile deals —
            we bring India to your doorstep
          </p>

          <Link
            href="/services"
            className="px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            Explore Our Services →
          </Link>
        </section>

        {/* How We Work Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-white/50 dark:bg-gray-800/30">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            How We Work
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
            Simple, transparent, and reliable — three easy steps to get started
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Browse Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Explore our wide range of Indian services tailored specifically for NRIs living in the USA
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Place Your Order
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Select your desired service and provide necessary details through our secure platform
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600 hover:border-orange-400 dark:hover:border-orange-400 hover:shadow-2xl transition-all duration-300">
              <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                We Deliver
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Our trusted team in India processes your request and delivers results directly to you
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Our Services
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 text-lg">
            Comprehensive solutions for all your India-related needs
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Life Insurance */}
            <Link
              href="/services/insurance"
              className="group bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-md rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-600 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Life Insurance
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                Secure your family&apos;s future with comprehensive Indian insurance policies
              </p>
            </Link>

            {/* Fabrics & Tailoring */}
            <Link
              href="/services/tailoring"
              className="group bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 backdrop-blur-md rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-600 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-pink-500 dark:bg-pink-600 flex items-center justify-center mb-4">
                <Shirt className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                Fabrics & Tailoring
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                Premium Indian fabrics and expert custom tailoring services
              </p>
            </Link>

            {/* Real Estate */}
            <Link
              href="/services/realestate"
              className="group bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-md rounded-3xl p-8 border-2 border-green-200 dark:border-green-600 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Real Estate
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                Smart property investments across India with expert guidance
              </p>
            </Link>

            {/* Auto Advertisements */}
            <Link
              href="/services/auto"
              className="group bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-md rounded-3xl p-8 border-2 border-amber-200 dark:border-amber-600 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500 dark:bg-amber-600 flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Auto Ads
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">
                Buy, sell, or advertise vehicles in India hassle-free
              </p>
            </Link>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">5000+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">50+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Indian Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-700 dark:text-gray-300 text-base">Support Available</div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of NRIs who trust Nridesikart for their Indian service needs
          </p>
          <Link
            href="/sign-up"
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105 inline-block"
          >
            Create Your Free Account →
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

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
