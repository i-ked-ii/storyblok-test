import { useState } from 'react';

// import Request from '../../../utils/request';
import Layout from '../../../components/Layout';
import FeedbackForm from '../../../components/FeedbackForm';

const Contact = () => {
  const services = {
    service_id: process.env.REACT_APP_EMAILJS_SERVICEID,
    template_id: process.env.REACT_APP_EMAILJS_TEMPLATEID,
    user_id: process.env.REACT_APP_EMAILJS_USERID,
  };
  const [email, setEmail] = useState('myemail@example.com');
  const [subject, setSubject] = useState('EMAIL SUBJECT LINE');
  const [msgs, setMessages] = useState('Testing some Mailgun awesomeness!');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleChangeMessage = (event) => {
    setMessages(event.target.value);
  };

  return (
    <Layout>
      <div className="container mx-auto my-10 bg-white">
        <h1 className="px-4 pt-5 sm:px-6 sm:pt-6">Contact</h1>
        <FeedbackForm env={services} />
        {/* <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                    onChange={handleChange}
                    // value={email}
                    name="email"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We'll never share your email with anyone else.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    aria-describedby="subject"
                    placeholder="Enter subject"
                    required
                    onChange={handleChangeSubject}
                    // value={subject}
                    name="subject"
                    id="subject"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="msg"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="msg"
                  name="msg"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  defaultValue={''}
                  // value={msgs}
                  onChange={handleChangeMessage}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form> */}
      </div>
    </Layout>
  );
};

export default Contact;
