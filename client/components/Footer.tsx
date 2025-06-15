"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaMedium, FaGlobe } from "react-icons/fa";

const socials = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/kaundal",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    url: "https://github.com/k-kaundal",
    label: "GitHub",
  },
  {
    icon: FaTwitter,
    url: "https://x.com/k_k_kaundal",
    label: "Twitter/X",
  },
  {
    icon: FaMedium,
    url: "https://solidity.today",
    label: "Medium",
  },
  {
    icon: FaGlobe,
    url: "https://pro.kaundal.vip",
    label: "pro.kaundal.vip",
  },
  {
    icon: FaGlobe,
    url: "https://darkevil.club",
    label: "darkevil.club",
  },
];

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-8 bg-gradient-to-r from-purple-900 via-gray-900 to-blue-900 text-gray-200 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="font-bold text-lg tracking-tight">
            Kamlesh Kumar &copy; {new Date().getFullYear()}
          </div>
          <div className="text-sm mt-1 text-purple-200">
            Crafted with Next.js, TypeScript, Tailwind CSS &amp; ❤️
          </div>
        </div>
        <div className="flex gap-5 text-2xl mt-4 md:mt-0">
          {socials.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-purple-400 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-400">
        Powered by <a href="https://nextjs.org/" className="underline hover:text-purple-200" target="_blank" rel="noopener noreferrer">Next.js</a>
        {" | "}
        <a href="mailto:kaundal.k.k@gmail.com" className="underline hover:text-purple-200">
          kaundal.k.k@gmail.com
        </a>
      </div>
    </footer>
  );
}