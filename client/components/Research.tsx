"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBookOpen, FaClock, FaFlask, FaRegFileAlt, FaLayerGroup } from "react-icons/fa";
import type { IconType } from "react-icons";
import SectionHeading from "./SectionHeading";
import { entries, topics, researchThreads, type Kind, type Topic } from "@/lib/writing";

const kindIcon: Record<Kind, IconType> = {
  Article: FaRegFileAlt,
  Note: FaBookOpen,
  Experiment: FaFlask,
  Collection: FaLayerGroup,
};

const statusStyle: Record<string, string> = {
  Active: "bg-green-500/12 text-green-700 dark:text-green-300",
  Exploring: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  Background: "bg-slate-500/12 text-slate-600 dark:text-slate-300",
};

export default function Research() {
  const [topic, setTopic] = useState<Topic>("All");

  const visible = useMemo(
    () => (topic === "All" ? entries : entries.filter((e) => e.topic === topic)),
    [topic]
  );

  // Only offer filters that would actually return something.
  const usableTopics = useMemo(
    () => topics.filter((t) => t === "All" || entries.some((e) => e.topic === t)),
    []
  );

  return (
    <section className="relative py-20" id="research">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Research & Notes"
          title="What I'm working through"
          subtitle="Open questions I'm actively chewing on, and the writing that comes out of it."
        />

        {/* ---- Open questions ------------------------------------------ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h4 className="text-sm font-bold tracking-widest uppercase text-purple-600 dark:text-purple-300 mb-6">
            Open Questions
          </h4>
          <ol className="space-y-4">
            {researchThreads.map((t, i) => (
              <motion.li
                key={t.question}
                className="card-glow rounded-2xl glass p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-purple-500/70 pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h5 className="text-lg font-semibold leading-snug">{t.question}</h5>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${statusStyle[t.status]}`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <p className="prose-measure text-gray-600 dark:text-gray-300">{t.detail}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ---- Writing, filterable ------------------------------------- */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h4 className="text-sm font-bold tracking-widest uppercase text-purple-600 dark:text-purple-300">
              Writing
            </h4>
            <div role="tablist" aria-label="Filter writing by topic" className="flex flex-wrap gap-2">
              {usableTopics.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={topic === t}
                  onClick={() => setTopic(t)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    topic === t
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                      : "glass hover:bg-purple-500/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <motion.ul layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {visible.map((e) => {
                const Icon = kindIcon[e.kind];
                return (
                  <motion.li
                    key={e.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-glow group flex gap-4 p-6 rounded-2xl glass"
                    >
                      <span className="w-10 h-10 shrink-0 grid place-items-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-300">
                        <Icon />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                          <span className="font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                            {e.kind}
                          </span>
                          <span aria-hidden>·</span>
                          <span>{e.venue}</span>
                          {e.minutes && (
                            <>
                              <span aria-hidden>·</span>
                              <span className="inline-flex items-center gap-1">
                                <FaClock className="text-[10px]" />
                                {e.minutes} min
                              </span>
                            </>
                          )}
                        </div>
                        <h5 className="font-semibold text-lg leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                          {e.title}
                        </h5>
                        <p className="prose-measure mt-2 text-gray-600 dark:text-gray-300">
                          {e.summary}
                        </p>
                      </div>
                      <FaArrowRight className="shrink-0 mt-1 text-purple-400 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </a>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
