import Menu from '@/components/common/Menu';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import CV from '@/components/sections/CV';
import Clients from '@/components/sections/Clients';
import Contact from '@/components/sections/Contact';
import SocialLinks from '@/components/sections/SocialLinks';
import Footer from '@/components/sections/Footer';

const MenuItems: { id: string; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'cv', label: 'CV' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
  { id: 'social-links', label: 'Social Links' },
];

export default function HomePage() {
  return (
    <main>
      <Menu items={MenuItems} />
      <Hero />
      <About />
      <Skills />
      <CV />
      <Clients />
      <Contact />
      <SocialLinks />
      <Footer />
    </main>
  );
}
