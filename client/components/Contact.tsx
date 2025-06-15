"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaGlobe, FaMedium } from "react-icons/fa";
import Image from "next/image";

const socials = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/kaundal",
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
  {
    icon: FaGithub,
    url: "https://github.com/k-kaundal",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    icon: FaTwitter,
    url: "https://x.com/k_k_kaundal",
    label: "Twitter/X",
    color: "hover:text-blue-500",
  },
  {
    icon: FaEnvelope,
    url: "mailto:kaundal.kamlesh@gmail.com",
    label: "Email",
    color: "hover:text-red-500",
  },
  {
    icon: FaGlobe,
    url: "https://pro.kaundal.vip",
    label: "pro.kaundal.vip",
    color: "hover:text-purple-500",
  },
  {
    icon: FaGlobe,
    url: "https://darkevil.club",
    label: "darkevil.club",
    color: "hover:text-fuchsia-500",
  },
  {
    icon: FaMedium,
    url: "https://solidity.today",
    label: "Medium (Solidity.Today)",
    color: "hover:text-green-700",
  },
];

export default function Contact() {
  return (
    <section className="py-16" id="contact">
      <h3 className="text-3xl font-bold text-center mb-8">Contact & Social</h3>
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/70 rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/kaundal.jpg"
            alt="Kamlesh Kumar"
            width={110}
            height={110}
            className="rounded-full border-4 border-purple-300 shadow-lg mb-4"
          />
          <div className="font-bold text-xl">Kamlesh Kumar</div>
          <div className="text-purple-600 dark:text-purple-300 font-medium mt-1">
            Tech Lead · AI & Blockchain Specialist
          </div>
        </div>
        <div className="w-full text-center mb-8 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
          <span>
            Let&apos;s connect! Whether you have a project, want to collaborate, or just want to chat about tech, reach out on any platform below.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-3xl mb-4">
          {socials.map(({ icon: Icon, url, label, color }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`transition-colors duration-200 ${color} p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow hover:scale-110`}
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="mt-6 text-base text-gray-500 dark:text-gray-400">
          Or email me:{" "}
          <a
            href="mailto:kaundal.k.k@gmail.com"
            className="underline hover:text-purple-700"
          >
            kaundal.k.k@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}