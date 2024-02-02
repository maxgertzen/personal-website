import MainLayout from '../components/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Skills from '../components/sections/Skills';
import SocialLinks from '../components/sections/SocialLinks';

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Contact />
      <SocialLinks />
    </MainLayout>
  );
};

export default HomePage;
