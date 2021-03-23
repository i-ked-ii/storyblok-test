import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import FeedbackForm from '../../../components/FeedbackForm';

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

export const getStaticPaths = () => {
  // return the story from Storyblok and whether preview mode is active
  return {
    paths: [{ params: { language: 'en' } }, { params: { language: 'de' } }],
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  let language = params.language || 'en';

  return {
    props: {
      language,
    },
  };
}

export default Contact;
