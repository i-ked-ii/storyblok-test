import React, { useState } from 'react';
import Layout from '../../../components/commons/layouts';
import FeedbackForm from '../../../components/FeedbackForm';

import Storyblok from '../../../utils/storyblok';

const Contact = (props) => {
  const services = {
    service_id: process.env.REACT_APP_EMAILJS_SERVICEID,
    template_id: process.env.REACT_APP_EMAILJS_TEMPLATEID,
    user_id: process.env.REACT_APP_EMAILJS_USERID,
  };
  const [language] = useState(props.language);

  return (
    <Layout language={language}>
      <div className="container mx-auto my-10 bg-white">
        <FeedbackForm env={services} title="Contact" />
      </div>
    </Layout>
  );
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

export default Contact;
