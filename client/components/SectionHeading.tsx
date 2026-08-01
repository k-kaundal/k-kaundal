"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-bold tracking-[0.2em] uppercase text-purple-600 dark:text-purple-300">
          {eyebrow}
        </span>
      )}
      <h3 className="text-3xl md:text-4xl font-extrabold">{title}</h3>
      <div className="mx-auto mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-purple-600" />
      {subtitle && (
        <p className="mt-5 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </motion.div>
  );
}
