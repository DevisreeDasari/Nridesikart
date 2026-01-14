"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Shield, Shirt, Home, Car, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/PillNav";
import ShootingStarsThemed from "@/components/ShootingStarsThemed";
import AuthAvatarMenu from "@/components/AuthAvatarMenu";

export default function ServicesPage() {
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

  const services = [
    {
      id: "insurance",
      title: "Life Insurance",
      description: "Secure your family's future with comprehensive Indian insurance policies. We partner with top insurance providers in India to offer you the best coverage options.",
      icon: Shield,
      color: "blue",
      features: ["Term Life Insurance", "Whole Life Policies", "Investment-linked Plans", "Health Insurance Add-ons"],
      bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-600",
      iconBg: "bg-blue-500 dark:bg-blue-600"
    },
    {
      id: "tailoring",
      title: "Fabrics & Tailoring",
      description: "Premium Indian fabrics and expert custom tailoring services. Get authentic Indian clothing made to your exact measurements and delivered to your doorstep.",
      icon: Shirt,
      color: "pink",
      features: ["Silk Sarees", "Custom Suits & Sherwanis", "Bridal Wear", "Traditional Outfits"],
      bgGradient: "from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20",
      borderColor: "border-pink-200 dark:border-pink-600",
      iconBg: "bg-pink-500 dark:bg-pink-600"
    },
    {
      id: "realestate",
      title: "Real Estate",
      description: "Smart property investments across India with expert guidance. Whether you're looking to buy, sell, or invest in Indian real estate, we've got you covered.",
      icon: Home,
      color: "green",
      features: ["Property Search", "Investment Advisory", "Legal Documentation", "Property Management"],
      bgGradient: "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-600",
      iconBg: "bg-green-500 dark:bg-green-600"
    },
    {
      id: "auto",
      title: "Auto Advertisements",
      description: "Buy, sell, or advertise vehicles in India hassle-free. Our platform connects you with verified buyers and sellers across major Indian cities.",
      icon: Car,
      color: "amber",
      features: ["Vehicle Listings", "Buyer-Seller Matching", "Price Negotiation", "Documentation Help"],
      bgGradient: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
      borderColor: "border-amber-200 dark:border-amber-600",
      iconBg: "bg-amber-500 dark:bg-amber-600"
    }
  ];

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

          <AuthAvatarMenu />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Comprehensive solutions for all your India-related needs. 
              Quality service, transparent pricing, and reliable delivery.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-gradient-to-br ${service.bgGradient} backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-300`}
                >
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className={`w-20 h-20 rounded-full ${service.iconBg} flex items-center justify-center mb-6`}>
                        <IconComponent className="w-10 h-10 text-white" strokeWidth={2} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-105"
                      >
                        Learn More <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          What We Offer
                        </h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                              <div className={`w-2 h-2 rounded-full ${service.iconBg}`}></div>
                              <span className="text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Can&apos;t Find What You Need?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us and let us know how we can help. We&apos;re always expanding our services to better serve the NRI community.
          </p>
          <Link
            href="/contact"
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:scale-105 inline-block"
          >
            Contact Us →
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
