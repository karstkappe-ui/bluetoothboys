import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SingleSection from '@/components/SingleSection';
import About from '@/components/About';
import Shows from '@/components/Shows';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SingleSection />
        <About />
        <Shows />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
