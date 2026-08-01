"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    company: "Independent Products",
    role: "Founder & AI Engineer",
    period: "2024 - Present",
    desc: "Designing, building and running AI-native products end to end — ForgeLearn, SecureEnv and RoastMyProd. LLM orchestration, retrieval pipelines, evals and cost control, plus everything around them: auth, billing, infra and support.",
    techs: ["LLM Apps", "RAG", "Agents", "Next.js", "TypeScript", "Python", "Product"],
  },
  {
    company: "Advantev Solutions",
    role: "Tech Lead & Architect",
    period: "2021 - Present",
    desc: "Spearheading architecture and development for AI, Blockchain, and SaaS projects. Leading a cross-functional team to deliver enterprise-grade systems and innovative digital solutions.",
    techs: ["AI/ML", "Blockchain", "Python", "React", "TypeScript", "AWS", "Team Leadership"],
  },
  {
    company: "Open Source & Community",
    role: "Contributor / Mentor",
    period: "2017 - Present",
    desc: "Actively contributing to open-source projects (AI, Web3, Next.js, Solidity). Mentoring developers, giving talks, and building tools for the community.",
    techs: ["Open Source", "Next.js", "Solidity", "TypeScript", "Mentorship", "Talks"],
  },
];

export default function Experience() {
  return (
    <section className="relative py-20 bg-surface-muted" id="experience">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Journey" title="Experience" />
        {/* Vertical rail with a node per role. */}
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-12">
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500 via-fuchsia-500 to-transparent" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="card-glow relative p-6 rounded-2xl glass"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="absolute -left-8 md:-left-12 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 ring-4 ring-[var(--surface-muted)]" />
                <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                  <span className="font-bold text-lg">{exp.role}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-200">
                    {exp.period}
                  </span>
                </div>
                <div className="font-medium text-purple-600 dark:text-purple-300">
                  {exp.company}
                </div>
                <div className="my-3 text-gray-700 dark:text-gray-200">{exp.desc}</div>
                <div className="flex flex-wrap gap-2">
                  {exp.techs.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-200 px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}