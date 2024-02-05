import { GetServerSideProps } from 'next';
import { DeviceProvider } from '../context/DeviceContext';
import MainLayout from '../components/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Skills from '../components/sections/Skills';
import SocialLinks from '../components/sections/SocialLinks';
import Footer from '../components/sections/Footer';
import Menu from '../components/common/Menu';

const MenuItems: { id: string; label: string }[] = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'social-links', label: 'Social Links' },
  { id: 'contact', label: 'Contact' },
];

interface HomePageProps {
  isMobile: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isMobile }) => {
  return (
    <DeviceProvider isMobile={isMobile}>
      <MainLayout>
        <Menu items={MenuItems} />
        <Hero />
        <About />
        <Skills />
        <SocialLinks />
        <Contact />
        <Footer />
      </MainLayout>
    </DeviceProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent']?.toLowerCase() ?? '';
  const isMobile = /mobile|android|iphone|ipad|phone/.test(userAgent);

  return {
    props: {
      isMobile,
    },
  };
};

export default HomePage;
