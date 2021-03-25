import Head from '../Head';
import Footer from '../Footer';
import CardFeed from '../../views/CardFeed';
import Hero from '../../views/SectionHero';
import HeroSection from '../../views/HeroSection';
import Nav from '../Nav';
// import { DataRecipesList } from '../mock/DataRecipesList';

const Layout = ({ children, language }) => (
  <div className="bg-gray-300 relative overflow-hidden">
    <Head />
    <Nav language={language} />
    {/* <Carousel slideValues={DataRecipesList} /> */}
    <div className="max-w-7xl mx-auto">
      {children}
      <HeroSection />
      <Hero />
      <CardFeed />
    </div>
    <Footer />
  </div>
);

export default Layout;
