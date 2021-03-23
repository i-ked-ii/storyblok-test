import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';

const FeedbackForm = (props) => {
  const { env, title } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [subject, setSubject] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

  const senderEmail = 'sender@example.com';

  const handleCancel = () => {
    setFeedback('');
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const template_id = env.template_id;
    const service_id = env.service_id;
    const user_id = env.user_id;
    sendFeedback({
      template_id,
      service_id,
      user_id,
    });

    setFormSubmitted(true);
  };

  // Note: this is using default_service, which will map to whatever
  // default email provider you've set in your EmailJS account.
  const sendFeedback = ({ templateId, service_id, user_id }) => {
    const templateParams = {
      name: 'James',
      notes: 'Check this out!',
    };
    // ลองส่งค่าไปแล้วมันจะแปะไม่ถูก
    emailjs
      .send(
        props.env.service_id,
        props.env.template_id,
        templateParams,
        props.env.user_id,
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

  if (formSubmitted && formSubmitSuccessful) {
    return <h2>Thank You! Your submission was sent.</h2>;
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="px-4 py-5 space-y-6 sm:p-6">
        <h1 className="text-2xl md:text-3xl">{title}</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                id="name"
                aria-describedby="name"
                placeholder="Enter name"
                required
                onChange={handleChangeName}
                value={name}
                name="name"
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
                onChange={handleChangeEmail}
                value={email}
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
                id="subject"
                aria-describedby="subject"
                placeholder="Enter Subject"
                required
                onChange={handleChangeSubject}
                value={subject}
                name="subject"
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
              id="feedback-entry"
              name="feedback-entry"
              rows={3}
              className="text-input shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter your feedback here"
              value={feedback}
              onChange={handleChange}
              required
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Save
          </button>
          <button
            className="btn btn--cancel inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  env: PropTypes.object.isRequired,
};

export default FeedbackForm;
