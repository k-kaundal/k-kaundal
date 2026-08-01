"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroSocials } from "@/lib/social";

const container = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const imageVariants = {
  initial: { scale: 0.85, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, delay: 0.25, ease: "easeOut" as const },
  },
};

const highlights = [
  "5+ years shipping production software",
  "LLM apps, RAG pipelines & autonomous agents",
  "Blockchain, Web3 & smart contract engineering",
  "Open source advocate — building in public",
];

const stats = [
  { value: "5+", label: "Years building" },
  { value: "5", label: "Live products" },
  { value: "10+", label: "Devs led" },
];

const AnimatedHero = () => {
  return (
    <section
      id="top"
      className="relative flex items-center min-h-screen pt-28 pb-20 overflow-hidden"
    >
      <div className="aurora" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div
            variants={container}
            initial="initial"
            animate="animate"
            className="w-full md:w-3/5"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-sm font-semibold glass text-purple-700 dark:text-purple-200"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for AI projects
            </motion.span>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient"
            >
              Kamlesh Kumar
            </motion.h1>

            <motion.h2
              variants={item}
              className="mt-4 text-xl md:text-3xl text-gray-600 dark:text-gray-300 font-semibold"
            >
              AI Engineer · Tech Lead · Builder of LLM Products
            </motion.h2>

            <motion.p variants={item} className="prose-lead mt-6">
              I design and ship <b>AI-native products</b> — retrieval pipelines, agentic
              workflows and LLM-backed tooling that hold up under real traffic. Ten years of
              web and blockchain engineering underneath, so the models land in systems that
              actually stay up.
            </motion.p>

            <motion.ul variants={item} className="mt-7 space-y-2.5">
              {highlights.map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-base md:text-lg text-gray-700 dark:text-gray-200"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 shrink-0" />
                  {text}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="flex flex-wrap gap-8 mt-9">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-gradient">{s.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex gap-4 mt-8">
              {heroSocials.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-11 h-11 grid place-items-center rounded-full glass text-lg text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:-translate-y-1 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4 mt-9">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg shadow-purple-600/25 font-semibold hover:scale-105 hover:shadow-purple-600/40 transition-all"
              >
                Let&apos;s Connect
              </a>
              <a
                href="#projects"
                className="px-8 py-3.5 rounded-full font-semibold glass hover:bg-purple-500/10 transition-colors"
              >
                See What I&apos;ve Built
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="initial"
            animate="animate"
            className="relative shrink-0"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-blue-500 opacity-25 blur-2xl" />
            <div className="relative rounded-full p-1 bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-blue-500">
              <Image
                src="/kaundal.jpg"
                alt="Kamlesh Kumar"
                width={300}
                height={300}
                priority
                className="rounded-full w-56 h-56 md:w-[300px] md:h-[300px] object-cover border-4 border-white dark:border-[#07060d]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
