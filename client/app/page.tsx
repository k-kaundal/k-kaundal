import AnimatedHero from '@/components/AnimatedHero';
import About from '@/components/About';
import Research from '@/components/Research';
import Learning from '@/components/Learning';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import XArticles from '@/components/XArticles';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <AnimatedHero />
      <About />
      <Research />
      <Learning />
      <TechStack />
      <Projects />
      <XArticles />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
