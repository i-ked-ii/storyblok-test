import Head from './Head';
import Footer from './FooterComponents';
import CardFeed from './CardFeed';
import Hero from './SectionHero';
import HeroSection from './HeroSection';
import Nav from './Nav';
// import Storyblok from '../utils/storyblok';

const Layout = ({ children, language }) => (
  <div className="bg-gray-300 relative overflow-hidden">
    <Head />
    <Nav language={language} />
    <div className="max-w-7xl mx-auto">
      {children}
      {/* {Storyblok.bridge()} */}
      <HeroSection />
      <Hero />
      <CardFeed />
    </div>
    <Footer />
  </div>
);

export default Layout;
