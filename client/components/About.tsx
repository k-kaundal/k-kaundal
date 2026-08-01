"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaRobot, FaSearch, FaShieldAlt } from "react-icons/fa";
import type { IconType } from "react-icons";
import SectionHeading from "./SectionHeading";

const focusAreas: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: FaBrain,
    title: "LLM Application Engineering",
    desc: "Production apps on top of Claude, GPT and open-weight models — prompt architecture, structured output, evals, token and latency budgets, graceful fallback when a provider goes sideways.",
  },
  {
    icon: FaSearch,
    title: "RAG & Retrieval Systems",
    desc: "Chunking strategies, embeddings, vector stores and hybrid search that actually returns the right passage. Grounded answers with citations instead of confident nonsense.",
  },
  {
    icon: FaRobot,
    title: "Agents & Automation",
    desc: "Tool-calling agents that do real work: multi-step workflows, MCP servers, human-in-the-loop checkpoints, and the guardrails that keep an autonomous loop from running away.",
  },
  {
    icon: FaShieldAlt,
    title: "AI Infrastructure & Safety",
    desc: "Streaming APIs, caching, cost observability, secret hygiene and prompt-injection defence — the unglamorous layer that decides whether an AI feature survives contact with users.",
  },
];

export default function About() {
  return (
    <section className="relative py-20" id="about">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="About" title="Building with AI" />
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          I started in full-stack web, spent years in blockchain and smart contracts, and now
          spend most of my time on AI systems. That path matters: the hard part of an LLM
          product is rarely the prompt — it&apos;s retrieval quality, evaluation, cost,
          latency and the failure modes nobody writes about in a demo. I build the whole
          thing, from the retrieval layer to the UI, and I ship it publicly.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {focusAreas.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="card-glow p-7 rounded-2xl glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="w-12 h-12 shrink-0 grid place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xl">
                  <Icon />
                </span>
                <h4 className="text-xl font-semibold">{title}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
