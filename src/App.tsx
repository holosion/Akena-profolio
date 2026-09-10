import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import EngineeringFocus from './sections/EngineeringFocus';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import AIMLSection from './sections/AIMLSection';
import Timeline from './sections/Timeline';
import GitHubActivity from './sections/GitHubActivity';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <EngineeringFocus />
        <Projects />
        <TechStack />
        <AIMLSection />
        <Timeline />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
