"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

/**
 * What I'm actively studying. Keep this honest and current — a stale
 * "currently learning" list is worse than none.
 */
const learning: { area: string; detail: string; depth: number }[] = [
  {
    area: "Evaluation & benchmarking for LLM systems",
    detail:
      "Building repeatable evals: golden sets, LLM-as-judge with human spot-checks, and regression suites that catch a prompt change before users do.",
    depth: 80,
  },
  {
    area: "Agent architectures & tool protocols",
    detail:
      "Multi-step planning, MCP servers, tool-permission design, and the failure modes that only appear once an agent runs unattended.",
    depth: 70,
  },
  {
    area: "Vector search & hybrid retrieval",
    detail:
      "Embedding choice, chunking strategy, reranking, and combining dense with keyword search when neither wins alone.",
    depth: 75,
  },
  {
    area: "Applied model fine-tuning",
    detail:
      "LoRA and adapter approaches — mostly to develop judgement about when fine-tuning beats better retrieval, which is less often than it looks.",
    depth: 45,
  },
];

const teaching = [
  "Mentoring developers moving from web work into AI engineering",
  "Writing practical, project-shaped lessons on ForgeLearn",
  "Publishing working notes rather than polished conclusions",
  "Open-source contributions across AI, Web3 and Next.js",
];

export default function Learning() {
  return (
    <section className="relative py-20 bg-surface-muted" id="learning">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Learning"
          title="Currently studying"
          subtitle="The field moves weekly. Here's where my attention actually is right now."
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-5">
            {learning.map((l, i) => (
              <motion.div
                key={l.area}
                className="card-glow rounded-2xl glass p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h4 className="font-semibold text-lg">{l.area}</h4>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 shrink-0">
                    {l.depth}%
                  </span>
                </div>
                <p className="prose-measure text-gray-600 dark:text-gray-300 mb-4">{l.detail}</p>
                <div
                  className="h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={l.depth}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Depth in ${l.area}`}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.depth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.aside
            className="card-glow rounded-2xl glass p-7 h-fit lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-sm font-bold tracking-widest uppercase text-purple-600 dark:text-purple-300 mb-5">
              Giving Back
            </h4>
            <ul className="space-y-4">
              {teaching.map((t) => (
                <li key={t} className="flex gap-3 text-gray-700 dark:text-gray-200">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://forgelearn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-7 px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:scale-105 transition"
            >
              Learn with me →
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
