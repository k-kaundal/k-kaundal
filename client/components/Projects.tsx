"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRocket, FaWrench } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

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
    <section className="relative py-20 bg-surface-muted" id="projects">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Work"
          title="Things I've Built"
          subtitle="Products I design, build and run myself — all live in production."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target={p.link.startsWith("http") ? "_blank" : undefined}
              rel={p.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card-glow group flex flex-col p-6 rounded-2xl glass cursor-pointer"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.05 + i * 0.08, duration: 0.5 }}
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2">
                  {statusIcon[p.status]}
                  <h4 className="text-xl font-bold">{p.title}</h4>
                </div>
                <FaArrowRight className="text-purple-400 shrink-0 mt-1.5 -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
              <div className="text-sm font-medium text-purple-600 dark:text-purple-300 mb-3">
                {p.domain}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-5 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-200 px-2.5 py-1 rounded-full text-xs font-medium"
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
      </div>
    </section>
  );
}
