export const metadata = {
  title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
  description:
    "Kamlesh Kumar is a software developer, tech lead, and open source advocate specializing in AI, Blockchain, and Web3. Explore his projects, experience, and connect for collaboration.",
  authors: [{ name: "Kamlesh Kumar", url: "https://pro.kaundal.vip" }],
  creator: "Kamlesh Kumar",
  keywords: [
    "Kamlesh Kumar",
    "k-kaundal",
    "Tech Lead",
    "AI Developer",
    "Blockchain Expert",
    "Web3",
    "Software Engineer",
    "Portfolio",
    "Open Source",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "pro.kaundal.vip",
    "darkevil.club",
    "solidity.today",
  ],
  openGraph: {
    title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
    description:
      "Software developer, tech lead, open source advocate. Explore projects, experience, and connect with Kamlesh Kumar.",
    url: "https://pro.kaundal.vip",
    siteName: "Kamlesh Kumar Portfolio",
    images: [
      {
        url: "https://pro.kaundal.vip/kaundal.jpg",
        width: 1200,
        height: 630,
        alt: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@k_k_kaundal",
    creator: "@k_k_kaundal",
    title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
    description:
      "Software developer, tech lead, open source advocate. Explore projects, experience, and connect with Kamlesh Kumar.",
    images: ["https://pro.kaundal.vip/kaundal.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#7C3AED",
};

import Image from "next/image";
import AnimatedHero from "@/components/AnimatedHero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      <AnimatedHero />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}