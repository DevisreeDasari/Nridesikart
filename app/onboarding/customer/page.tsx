"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerOnboardingPage() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-orange-200 dark:border-orange-600 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome, {user?.firstName || "Friend"}!
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Your account has been created successfully. You&apos;re now part of the Nridesikart family!
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 mb-8 border border-orange-200 dark:border-orange-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What&apos;s Next?
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">1.</span>
                <span>Browse our services tailored for NRIs in the USA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">2.</span>
                <span>Complete your profile to get personalized recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">3.</span>
                <span>Connect with our support team for any questions</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:scale-105 text-center"
            >
              Explore Services
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-bold text-lg rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 text-center"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
