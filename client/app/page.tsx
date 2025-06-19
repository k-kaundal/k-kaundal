'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import Image from 'next/image';
import AnimatedHero from '@/components/AnimatedHero';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Posts from '@/components/Posts';

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        <Navbar />
        <AnimatedHero />
        <TechStack />
        <Projects />
        <Experience />
        <Posts />
        <Contact />
        <Footer />
      </main>
    </ApolloProvider>
  );
}