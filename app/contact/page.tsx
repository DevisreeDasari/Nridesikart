"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Sun, Moon, Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/PillNav";
import ShootingStarsThemed from "@/components/ShootingStarsThemed";
import AuthAvatarMenu from "@/components/AuthAvatarMenu";

export default function ContactPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const currentTheme = resolvedTheme || theme;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

          <AuthAvatarMenu />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">support@nridesikart.com</p>
                    <p className="text-gray-700 dark:text-gray-300">info@nridesikart.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Call Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">USA: +1 (555) 123-4567</p>
                    <p className="text-gray-700 dark:text-gray-300">India: +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Our Offices</h3>
                    <p className="text-gray-700 dark:text-gray-300">USA: 123 Business Ave, New York, NY 10001</p>
                    <p className="text-gray-700 dark:text-gray-300">India: 456 Commerce St, Mumbai 400001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-600">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9 AM - 6 PM (EST)</p>
                    <p className="text-gray-700 dark:text-gray-300">24/7 Online Support Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-orange-200 dark:border-orange-600">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="insurance">Life Insurance</option>
                    <option value="tailoring">Fabrics & Tailoring</option>
                    <option value="realestate">Real Estate</option>
                    <option value="auto">Auto Advertisements</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-orange-200 dark:border-orange-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
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
