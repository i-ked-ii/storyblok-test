import Layout from '../../../components/Layout';
import FeedbackForm from '../../../components/FeedbackForm';

const Contact = () => {
  const services = {
    service_id: process.env.REACT_APP_EMAILJS_SERVICEID,
    template_id: process.env.REACT_APP_EMAILJS_TEMPLATEID,
    user_id: process.env.REACT_APP_EMAILJS_USERID,
  };

  return (
    <Layout>
      <div className="container mx-auto my-10 bg-white">
        <FeedbackForm env={services} title="Contact" />
      </div>
    </Layout>
  );
};

export default Contact;
