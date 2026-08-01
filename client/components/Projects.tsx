"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaRocket, FaWrench } from "react-icons/fa";

// Define a type for status
type Status = "live" | "working";

const projects: {
  title: string;
  domain: string;
  desc: string;
  link: string;
  status: Status;
  tags: string[];
}[] = [
  {
    title: "ForgeLearn",
    domain: "forgelearn.dev",
    desc: "A hands-on learning platform for developers — practical, project-shaped lessons instead of passive video, with AI assistance guiding you through each build.",
    link: "https://forgelearn.dev",
    status: "live",
    tags: ["AI", "EdTech", "Next.js", "TypeScript", "LLM"],
  },
  {
    title: "SecureEnv",
    domain: "secureenv.in",
    desc: "Secrets and environment-variable security for teams — scan, store and share config safely so credentials stop leaking through .env files, chat threads and commits.",
    link: "https://secureenv.in",
    status: "live",
    tags: ["Security", "DevTools", "Secrets", "Node.js"],
  },
  {
    title: "RoastMyProd",
    domain: "roastmyprod.com",
    desc: "Drop in your product or landing page and get an unfiltered AI critique — positioning, copy, UX and conversion gaps, delivered as blunt, actionable feedback.",
    link: "https://roastmyprod.com",
    status: "live",
    tags: ["AI", "LLM", "Product", "Next.js"],
  },
  {
    title: "Pro Kaundal",
    domain: "pro.kaundal.vip",
    desc: "A growing collection of free developer tools — no signup, no paywall, no credit card. Just open the one you need and use it.",
    link: "https://pro.kaundal.vip",
    status: "live",
    tags: ["Free Tools", "DevTools", "Next.js", "Utilities"],
  },
  {
    title: "Kaundal VIP — Blog",
    domain: "kaundal.vip",
    desc: "Where I write it all down: AI engineering, LLM and RAG patterns, Web3, and hard-won notes from building and shipping side projects in public.",
    link: "https://kaundal.vip",
    status: "live",
    tags: ["Blog", "Writing", "AI", "Web3"],
  },
];

const statusIcon: Record<Status, React.ReactNode> = {
  live: <FaRocket className="inline-block mr-1 text-green-500" title="Live" />,
  working: <FaWrench className="inline-block mr-1 text-yellow-500" title="In Development" />,
};

export default function Projects() {
  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900"
      id="projects"
    >
      <h3 className="text-3xl font-bold text-center mb-2">Things I&apos;ve Built</h3>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        Products I design, build and run myself — all live in production.
      </p>
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target={p.link.startsWith("http") ? "_blank" : undefined}
            rel={p.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`w-80 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-2xl transition bg-white dark:bg-gray-800 border-2 ${
              p.status === "working" ? "border-yellow-400" : "border-green-400"
            }`}
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">{statusIcon[p.status]}</span>
              <h4 className="text-xl font-semibold">{p.title}</h4>
              {p.link.startsWith("http") && <FaLink className="ml-2 text-purple-400" />}
            </div>
            <div className="text-sm text-purple-500 dark:text-purple-300 mb-3">{p.domain}</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags &&
                p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            {p.status === "working" && (
              <div className="mt-4 text-xs text-yellow-600 dark:text-yellow-300 font-semibold">
                🚧 In Development
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
