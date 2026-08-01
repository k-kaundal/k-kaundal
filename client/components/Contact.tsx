"use client";
import React from "react";
import Image from "next/image";
import { socials, EMAIL } from "@/lib/social";

export default function Contact() {
  return (
    <section className="py-16" id="contact">
      <h3 className="text-3xl font-bold text-center mb-8">Contact & Social</h3>
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/70 rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/kaundal.jpg"
            alt="Kamlesh Kumar"
            width={110}
            height={110}
            className="rounded-full border-4 border-purple-300 shadow-lg mb-4"
          />
          <div className="font-bold text-xl">Kamlesh Kumar</div>
          <div className="text-purple-600 dark:text-purple-300 font-medium mt-1">
            AI Engineer · Tech Lead
          </div>
        </div>
        <div className="w-full text-center mb-8 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
          <span>
            Let&apos;s connect! Whether you&apos;re building something with LLMs, want to
            collaborate, or just want to argue about agent design — reach out on any
            platform below.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-3xl mb-4">
          {socials.map(({ icon: Icon, url, label, color }) => (
            <a
              key={label}
              href={url}
              target={url.startsWith("mailto:") ? undefined : "_blank"}
              rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              title={label}
              className={`transition-colors duration-200 ${color} p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow hover:scale-110`}
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="mt-6 text-base text-gray-500 dark:text-gray-400">
          Or email me:{" "}
          <a href={`mailto:${EMAIL}`} className="underline hover:text-purple-700">
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
