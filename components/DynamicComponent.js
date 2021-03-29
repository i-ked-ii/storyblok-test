// import SbEditable from 'storyblok-react';
import Teaser from './Teaser';
import Feature from './Feature';
import FeaturedPosts from './FeaturedPosts';
import Grid from './Grid';
import Placeholder from './Placeholder';
import Grid50 from './Grid50';

// resolve Storyblok components to Next.js components
const Components = {
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  'featured-posts': FeaturedPosts,
  'grid-50': Grid50,
};

const DynamicComponent = ({ blok }) => {
  // console.log('blok', blok);
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];
    // wrap with SbEditable for visual editing
    return <Component blok={blok} />;
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
