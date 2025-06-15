"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Experience", href: "#experience" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Article", href: "https://solidity.today", target: "_blank", rel: "noopener noreferrer" },
  { label: "Blog", href: "https://kaundal.vip", target: "_blank", rel: "noopener noreferrer" },
  { label: "Contact", href: "#contact" },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 bg-white/70 dark:bg-gray-900/80 shadow-lg z-50 backdrop-blur transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link
          href="/"
          className="font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent tracking-tight"
        >
          Kamlesh Kumar
        </Link>
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 1.2, rotate: 90 }}
            aria-label={open ? "Close Menu" : "Open Menu"}
            onClick={() => setOpen((o) => !o)}
            className="text-purple-700 dark:text-purple-300 focus:outline-none"
          >
            {open ? <FaTimes size={28} /> : <FaBars size={28} />}
          </motion.button>
        </div>
        <ul className="hidden md:flex gap-8 font-medium items-center">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <a
                href={link.href}
                className="hover:text-purple-600 dark:hover:text-purple-400 hover:underline underline-offset-4 transition font-semibold px-2 py-1"
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="md:hidden absolute left-0 top-full w-full bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-gray-800 shadow-lg flex flex-col gap-5 px-8 py-8 z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.09 }}
              >
                <a
                  href={link.href}
                  className="block py-2 text-lg font-semibold hover:text-purple-700 transition"
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