"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";

type AuthAvatarMenuProps = {
  className?: string;
  align?: "left" | "right";
  onNavigate?: () => void;
};

export default function AuthAvatarMenu({
  className,
  align = "right",
  onNavigate
}: AuthAvatarMenuProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className={className}>
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
    );
  }

  const avatarUrl = user?.imageUrl;
  const fallbackLetter = (user?.firstName || user?.username || "U").slice(0, 1).toUpperCase();

  return (
    <div className={className} ref={menuRef}>
      <div className="relative hidden md:block">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-orange-300 dark:border-orange-500 bg-white dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
          aria-label="Open profile menu"
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold">{fallbackLetter}</span>
            </div>
          )}
        </button>

        {open && (
          <div
            className={`absolute mt-3 min-w-[180px] rounded-2xl border-2 border-orange-200 dark:border-orange-600 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl overflow-hidden ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            <Link
              href="/account"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="block px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              Account
            </Link>
            <button
              type="button"
              onClick={async () => {
                setOpen(false);
                await signOut({ redirectUrl: "/" });
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
