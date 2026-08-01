"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroSocials } from "@/lib/social";

const heroVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1 } },
};

const imageVariants = {
  initial: { scale: 0, rotate: -10, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 1.2, delay: 0.2 } },
};

const highlights = [
  "5+ years shipping production software",
  "LLM apps, RAG pipelines & autonomous agents",
  "Blockchain, Web3 & smart contract engineering",
  "Open source advocate — building in public",
];

const AnimatedHero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20 min-h-[80vh]">
      <div className="flex flex-col container md:flex-row items-center justify-between w-full mx-auto">
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate="animate"
          className="w-full md:w-1/2"
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200">
            AI Engineer · Tech Lead
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent">
            Kamlesh Kumar
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-semibold">
            AI Engineer · Tech Lead · Builder of LLM Products
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-xl">
            I design and ship <b>AI-native products</b> — retrieval pipelines, agentic
            workflows and LLM-backed tooling that hold up under real traffic. Ten years of
            web and blockchain engineering underneath, so the models land in systems that
            actually stay up.
          </p>
          <ul className="mt-6 space-y-2">
            {highlights.map((item, idx) => (
              <motion.li
                key={item}
                className="flex items-center gap-2 text-base md:text-lg text-gray-700 dark:text-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500" /> {item}
              </motion.li>
            ))}
          </ul>
          <div className="flex gap-6 mt-8">
            {heroSocials.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-2xl text-gray-500 hover:text-purple-600 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg font-semibold hover:scale-105 transition"
            >
              Let&apos;s Connect
            </a>
            <a
              href="#projects"
              className="inline-block px-8 py-3 border-2 border-purple-500 text-purple-700 dark:text-purple-300 rounded-full font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/40 transition"
            >
              See What I&apos;ve Built
            </a>
          </div>
        </motion.div>
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate="animate"
          className="mt-10 md:mt-0 md:ml-10 flex justify-center items-center"
        >
          <Image
            src="/kaundal.jpg"
            alt="Kamlesh Kumar"
            width={280}
            height={280}
            priority
            className="rounded-full shadow-xl border-4 border-purple-400"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHero;
