"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaRocket, FaWrench } from "react-icons/fa";

// Define a type for status
type Status = "live" | "working";

const projects: {
  title: string;
  desc: string;
  link: string;
  status: Status;
  tags: string[];
}[] = [
    {
    title: "Tranding News & Tech",
    desc: "Latest headlines and technology trends from top sources like TechCrunch, Wired, and more. Stay updated with real-time news.",
    link: "https://news.kaundal.vip",
    status: "live",
    tags: ["Next.js", "AI", "Tailwind", "Personal Brand", "RSS"],
  },
  {
    title: "pro.kaundal.vip",
    desc: "Personal/professional digital workspace — portfolio, blog, and productivity hub, powered by Next.js, Tailwind and an AI assistant.",
    link: "https://pro.kaundal.vip",
    status: "live",
    tags: ["Next.js", "AI", "Tailwind", "Personal Brand"],
  },
  {
    title: "Url Shortener & Link Management",
    desc: "Open-source URL shortener and link management tool. Create, track, and manage links with a user-friendly interface.",
    link: "https://darkevil.club",
    status: "live",
    tags: ["Community", "Open Source", "Node.js", ],
  },
  {
    title: "AI-powered Portfolio Generator",
    desc: "Tool that uses AI to craft and deploy personalized developer portfolios with one click.",
    link: "#",
    status: "working",
    tags: ["AI", "Automation", "Next.js"],
  },
  {
    title: "Blockchain Supply Chain",
    desc: "End-to-end supply chain dApp using Ethereum smart contracts. Transparent, auditable, and decentralized.",
    link: "#",
    status: "working",
    tags: ["Blockchain", "Ethereum", "Solidity", "dApp"],
  },
  {
    title: "Team Collaboration Suite",
    desc: "Real-time chat, code, and Kanban board for remote teams. All-in-one productivity platform.",
    link: "#",
    status: "working",
    tags: ["Collaboration", "WebSockets", "React"],
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
      <h3 className="text-3xl font-bold text-center mb-8">Featured Projects</h3>
      <div className="flex flex-wrap justify-center gap-10">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target={p.link.startsWith("http") ? "_blank" : undefined}
            rel={p.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`w-80 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-2xl transition bg-white dark:bg-gray-800 border-2 ${
              p.status === "working"
                ? "border-yellow-400"
                : "border-green-400"
            }`}
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">{statusIcon[p.status]}</span>
              <h4 className="text-xl font-semibold">{p.title}</h4>
              {p.link.startsWith("http") && (
                <FaLink className="ml-2 text-purple-400" />
              )}
            </div>
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