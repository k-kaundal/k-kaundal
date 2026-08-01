"use client";
import React from "react";
import Image from "next/image";
import { socials, EMAIL } from "@/lib/social";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section className="relative py-20 overflow-hidden" id="contact">
      <div className="aurora" />
      <div className="container mx-auto px-4 relative z-10">
      <SectionHeading eyebrow="Say hello" title="Contact & Social" />
      <div className="max-w-2xl mx-auto card-glow glass rounded-3xl px-8 py-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/kaundal.jpg"
            alt="Kamlesh Kumar"
            width={110}
            height={110}
            className="rounded-full border-4 border-purple-400/60 shadow-lg mb-4"
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
              className={`transition-all duration-200 ${color} p-3 rounded-full glass shadow hover:scale-110 hover:-translate-y-1`}
            >
              <Icon />
            </a>
          ))}
        </div>
        <div className="mt-6 text-base text-gray-500 dark:text-gray-400">
          Or email me:{" "}
          <a href={`mailto:${EMAIL}`} className="underline hover:text-purple-600">
            {EMAIL}
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
