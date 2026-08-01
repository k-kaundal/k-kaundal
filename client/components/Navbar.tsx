"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

type NavLink = { label: string; href: string; target?: string; rel?: string };

const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "AI", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "https://kaundal.vip", target: "_blank", rel: "noopener noreferrer" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks
  .filter((l) => l.href.startsWith("#"))
  .map((l) => l.href.slice(1));

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently occupies the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-purple-900/5 py-2"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-xl md:text-2xl text-gradient tracking-tight"
        >
          Kamlesh Kumar
        </Link>

        <ul className="hidden md:flex gap-1 font-medium items-center">
          {navLinks.map((link, i) => {
            const isActive = link.href === `#${active}`;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className={`relative px-3 py-2 rounded-full text-sm transition-colors ${
                    isActive
                      ? "text-purple-700 dark:text-purple-200"
                      : "hover:text-purple-600 dark:hover:text-purple-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-purple-500/12 dark:bg-purple-400/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-semibold">{link.label}</span>
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 1.2, rotate: 90 }}
              aria-label={open ? "Close Menu" : "Open Menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="text-purple-700 dark:text-purple-300 focus:outline-none p-2"
            >
              {open ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="md:hidden absolute left-0 top-full w-full glass shadow-lg flex flex-col gap-2 px-8 py-6 z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <a
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  className={`block py-2 text-lg font-semibold transition ${
                    link.href === `#${active}`
                      ? "text-purple-600 dark:text-purple-300"
                      : "hover:text-purple-700"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
