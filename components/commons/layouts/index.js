import Head from '../Head';
import Footer from '../Footer';
import Nav from '../Nav';
import StoryblokService from '../../../utils/storyblok';

const Layout = ({ children, language }) => (
  <div className="bg-gray-300 relative overflow-hidden">
    <Head />
    <Nav language={language} />
    <div className="max-w-7xl mx-auto px-4 2xl:px-5 py-5">{children}</div>
    {StoryblokService.bridge()}
    <Footer />
  </div>
);

export default Layout;
