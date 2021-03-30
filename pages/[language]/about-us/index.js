import React from 'react';

import Layout from '../../../components/commons/layouts';
import Storyblok from '../../../utils/storyblok';

const About = (props) => {
  const { language } = props;
  return <Layout language={language}>About Us</Layout>;
};

export const getStaticPaths = async () => {
  // return the story from Storyblok and whether preview mode is active
  let { data } = await Storyblok.get('cdn/links/', {});
  // let lange = 'th' || 'en';
  let paths = [];
  for (const linkKey of Object.keys(data.links)) {
    if (!data.links[linkKey].is_folder && data.links[linkKey].slug !== 'home') {
      const host = data.links[linkKey].slug.split('/');
      const lange = host.slice(0, 1);
      paths.push({ params: { language: lange[0] } });
    }
  }
  return {
    paths: paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language;

  return {
    props: {
      language,
    },
  };
}

export default About;
