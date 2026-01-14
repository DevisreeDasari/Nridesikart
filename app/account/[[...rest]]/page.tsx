"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300 px-4 py-16">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-4 md:p-8 border-2 border-orange-200 dark:border-orange-600 shadow-2xl">
        <UserProfile routing="path" path="/account" />
      </div>
    </div>
  );
}
