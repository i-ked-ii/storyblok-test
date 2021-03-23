import Head from './Head';
import Navigation from './Navigation';
import Footer from './Footer';
// import Storyblok from '../utils/storyblok';

const Layout = ({ children, language }) => (
  <div className="bg-gray-300 relative overflow-hidden">
    <Head />
    <Navigation language={language} />
    <div className="max-w-7xl mx-auto">
      {children}
      <Footer />
      {/* {Storyblok.bridge()} */}
    </div>
  </div>
);

export default Layout;
