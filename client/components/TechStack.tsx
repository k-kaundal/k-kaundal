"use client";
import React from "react";
import {
  FaReact,
  FaNode,
  FaPython,
  FaEthereum,
  FaAws,
  FaDocker,
  FaDatabase,
  FaGitAlt,
  FaLinux,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
  SiOpenai,
  SiAnthropic,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiGooglecloud,
  SiJavascript,
  SiGraphql,
  SiSolidity,
  SiVercel,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import SectionHeading from "./SectionHeading";

type Group = { heading: string; items: { icon: IconType; name: string }[] };

const groups: Group[] = [
  {
    heading: "AI & Machine Learning",
    items: [
      { icon: SiAnthropic, name: "Claude API" },
      { icon: SiOpenai, name: "OpenAI API" },
      { icon: SiLangchain, name: "LangChain" },
      { icon: FaProjectDiagram, name: "RAG / Vector DBs" },
      { icon: SiHuggingface, name: "Hugging Face" },
      { icon: SiPytorch, name: "PyTorch" },
      { icon: SiTensorflow, name: "TensorFlow" },
      { icon: SiScikitlearn, name: "scikit-learn" },
      { icon: SiPandas, name: "Pandas" },
      { icon: SiNumpy, name: "NumPy" },
    ],
  },
  {
    heading: "Web & Backend",
    items: [
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: FaReact, name: "React" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiJavascript, name: "JavaScript" },
      { icon: FaNode, name: "Node.js" },
      { icon: FaPython, name: "Python" },
      { icon: SiFastapi, name: "FastAPI" },
      { icon: TbBrandGolang, name: "Go" },
      { icon: SiGraphql, name: "GraphQL" },
    ],
  },
  {
    heading: "Blockchain & Web3",
    items: [
      { icon: FaEthereum, name: "Ethereum" },
      { icon: SiSolidity, name: "Solidity" },
    ],
  },
  {
    heading: "Data & Infrastructure",
    items: [
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiRedis, name: "Redis" },
      { icon: FaDatabase, name: "SQL/NoSQL" },
      { icon: FaAws, name: "AWS" },
      { icon: SiGooglecloud, name: "GCP" },
      { icon: SiVercel, name: "Vercel" },
      { icon: FaDocker, name: "Docker" },
      { icon: SiKubernetes, name: "Kubernetes" },
      { icon: FaGitAlt, name: "Git" },
      { icon: FaLinux, name: "Linux" },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="relative py-20" id="tech-stack">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Toolkit"
          title="My Tech Arsenal"
          subtitle="What I reach for, grouped by what it actually does."
        />
        <div className="space-y-12 max-w-5xl mx-auto">
          {groups.map((group) => (
            <div key={group.heading}>
              <h4 className="text-sm font-bold tracking-widest uppercase text-center mb-6 text-purple-600 dark:text-purple-300">
                {group.heading}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {group.items.map(({ icon: Icon, name }, i) => (
                  <motion.div
                    key={name}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass hover:border-purple-400/50 transition-colors"
                    whileHover={{ y: -4, scale: 1.04 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                  >
                    <Icon size={20} className="text-purple-500 shrink-0" />
                    <span className="text-sm font-medium whitespace-nowrap">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
