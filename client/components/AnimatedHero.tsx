"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const heroVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1 } },
};

const imageVariants = {
  initial: { scale: 0, rotate: -10, opacity: 0 },
  animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 1.2, delay: 0.2 } },
};

const socials = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/kaundal",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    url: "https://github.com/k-kaundal",
    label: "GitHub",
  },
  {
    icon: FaTwitter,
    url: "https://x.com/k_k_kaundal",
    label: "Twitter",
  },
];

const highlights = [
  "5+ years of experience",
  // "Ex-Startup CTO / Tech Lead",
  "AI, Blockchain & Web3 Specialist",
  "Open Source Advocate",
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
        <h1 className="text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent">
          Kamlesh Kumar
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-semibold">
          Software Developer · Tech Lead · AI & Blockchain Expert
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-xl">
          Hi! I craft solutions at the intersection of <b>AI</b>, <b>Blockchain</b>, and the modern web. 
          Let’s build the future together!
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
          {socials.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-2xl text-gray-500 hover:text-purple-600 transition"
            >
              <Icon />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg font-semibold hover:scale-105 transition"
        >
          Let&apos;s Connect
        </a>
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