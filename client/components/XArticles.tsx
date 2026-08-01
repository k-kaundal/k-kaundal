"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { useTheme } from "./ThemeToggle";
import { X_ARTICLES_HANDLE } from "@/lib/social";

const WIDGET_SRC = "https://platform.twitter.com/widgets.js";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: (el?: HTMLElement) => void } };
  }
}

/**
 * Embedded X timeline. The widget script rewrites the <a> below into an
 * iframe; if it is blocked or slow, the link stays visible as a fallback
 * rather than leaving an empty box.
 */
export default function XArticles() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setTimedOut(false);

    // If the widget hasn't rendered by now it is almost certainly blocked
    // (tracker blockers catch it routinely) — show the link instead of a
    // skeleton that never resolves.
    const timer = setTimeout(() => {
      if (!cancelled && !containerRef.current?.querySelector("iframe")) {
        setTimedOut(true);
      }
    }, 6000);

    const render = () => {
      if (cancelled || !containerRef.current) return;
      window.twttr?.widgets?.load?.(containerRef.current);
    };

    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) {
      render();
    } else {
      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.charset = "utf-8";
      script.onload = render;
      document.body.appendChild(script);
    }

    // The widget swaps the anchor for an iframe — watch for that to hide
    // the loading skeleton.
    const observer = new MutationObserver(() => {
      if (containerRef.current?.querySelector("iframe")) setLoaded(true);
    });
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer.disconnect();
    };
    // Re-mounting on theme change lets the widget re-render in the new palette.
  }, [theme]);

  return (
    <section className="relative py-20" id="writing">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Writing"
          title="Latest from X"
          subtitle="Threads and articles on AI engineering, LLM patterns and building in public."
        />

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="card-glow rounded-2xl glass p-4 md:p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-3">
                <FaXTwitter className="text-xl" />
                <div>
                  <div className="font-semibold leading-tight">Articles &amp; Threads</div>
                  <a
                    href={`https://x.com/${X_ARTICLES_HANDLE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 dark:text-purple-300 hover:underline"
                  >
                    @{X_ARTICLES_HANDLE}
                  </a>
                </div>
              </div>
              <a
                href={`https://x.com/${X_ARTICLES_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:scale-105 transition"
              >
                Follow
              </a>
            </div>

            {/* Placeholder shown until the widget iframe appears. */}
            {!loaded && !timedOut && (
              <div className="animate-pulse space-y-3 px-1 pb-2" aria-hidden>
                {[0, 1, 2].map((n) => (
                  <div key={n} className="h-20 rounded-xl bg-black/5 dark:bg-white/5" />
                ))}
              </div>
            )}

            {timedOut && !loaded && (
              <div className="text-center py-10 px-4">
                <p className="text-gray-600 dark:text-gray-300">
                  The X timeline could not load — a tracker blocker or network policy
                  is likely blocking it.
                </p>
                <a
                  href={`https://x.com/${X_ARTICLES_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2.5 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:scale-105 transition"
                >
                  Read on X →
                </a>
              </div>
            )}

            <div ref={containerRef} key={theme} className={timedOut && !loaded ? "hidden" : ""}>
              <a
                className="twitter-timeline"
                data-height="600"
                data-theme={theme}
                data-chrome="noheader nofooter transparent"
                data-dnt="true"
                href={`https://twitter.com/${X_ARTICLES_HANDLE}`}
              >
                Posts by @{X_ARTICLES_HANDLE}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
