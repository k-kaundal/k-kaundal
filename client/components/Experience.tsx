"use client";
import React from "react";
import { motion } from "framer-motion";

const experiences = [
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
    <section className="py-16" id="experience">
      <h3 className="text-3xl font-bold text-center mb-8">Experience</h3>
      <div className="max-w-3xl mx-auto space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg">{exp.role}</span>
              <span className="text-sm text-gray-400">{exp.period}</span>
            </div>
            <div className="font-medium text-purple-600">{exp.company}</div>
            <div className="my-2 text-gray-700 dark:text-gray-200">{exp.desc}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.techs.map((tech) => (
                <span
                  key={tech}
                  className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}