import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
import axios from 'axios';

const FeedbackForm = (props) => {
  console.log('props', props);
  const { env } = props;
  const [feedback, setFeedback] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

  const senderEmail = 'sender@example.com';

  const handleCancel = () => {
    setFeedback('');
  };

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const template_id = props.env.template_id;
    const service_id = props.env.service_id;
    const user_id = props.env.user_id;
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
    // axios
    //   .post('https://api.emailjs.com/api/v1.0/email/send', {
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json',
    //   })
    //   .then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //     setFormSubmitSuccessful(true);
    //   })
    //   .catch(function (error) {
    //     console.log('FAILED...', JSON.stringify(error));
    //     setFormSubmitSuccessful(false);
    //   });
  };

  if (formSubmitted && formSubmitSuccessful) {
    return <h2>Thank You! Your submission was sent.</h2>;
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h1>Your Feedback</h1>
      <textarea
        className="text-input"
        id="feedback-entry"
        name="feedback-entry"
        onChange={handleChange}
        placeholder="Enter your feedback here"
        required
        value={feedback}
      />
      <div className="btn-group">
        <button className="btn btn--cancel" onClick={handleCancel}>
          Cancel
        </button>
        <input type="submit" value="Submit" className="btn btn--submit" />
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  env: PropTypes.object.isRequired,
};

export default FeedbackForm;
