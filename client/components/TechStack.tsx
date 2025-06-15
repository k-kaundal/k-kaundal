"use client";
import React from "react";
import { FaReact, FaNode, FaPython, FaEthereum, FaAws, FaDocker, FaDatabase, FaJava, FaGitAlt, FaLinux } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTensorflow, SiMongodb, SiPostgresql, SiRedis, SiKubernetes, SiGooglecloud, SiOpenai, SiDjango, SiFlask, SiJavascript, SiGraphql, SiSolidity } from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";
import { motion } from "framer-motion";

const stack = [
  { icon: FaReact, name: "React/Next.js" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: FaPython, name: "Python" },
  { icon: TbBrandGolang, name: "Go" },
  { icon: FaJava, name: "Java" },
  { icon: FaNode, name: "Node.js" },
  { icon: SiDjango, name: "Django" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: SiOpenai, name: "OpenAI API" },
  { icon: FaEthereum, name: "Ethereum" },
  { icon: SiSolidity, name: "Solidity" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiRedis, name: "Redis" },
  { icon: SiGraphql, name: "GraphQL" },
  { icon: FaAws, name: "AWS" },
  { icon: SiGooglecloud, name: "GCP" },
  { icon: FaDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: FaDatabase, name: "SQL/NoSQL" },
  { icon: FaGitAlt, name: "Git" },
  { icon: FaLinux, name: "Linux" },
];

const TechStack = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">My Tech Arsenal</h3>
      <div className="flex flex-wrap justify-center gap-10">
        {stack.map(({ icon: Icon, name }, i) => (
          <motion.div
            key={name}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.2, rotate: 6 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Icon size={48} className="text-purple-500 mb-2" />
            <span className="text-lg text-center">{name}</span>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default TechStack;