import axios from 'axios';

async function contactForm(data, contact) {
  if (!process.env.SENDGRID_FUNCTION_ENDPOINT) {
    return {
      status: false,
      message:
        'You must add a SendGrid Function Endpoint URL.  Contact your developer to add this value.',
    };
  } else {
    try {
      var message =
        'Name:<br>' +
        data.name +
        '<br><br>' +
        'Subject:<br>' +
        contact.metadata.subject +
        '<br><br>' +
        'Message:<br>' +
        data.message +
        '<br><br>';
      var email_data = {
        from: data.email,
        to: contact.metadata.to,
        subject: data.name + ' sent you a new message',
        text_body: message,
        html_body: message,
      };
      const url = process.env.SENDGRID_FUNCTION_ENDPOINT;
      await axios.post(url, email_data);
      saveForm(data);
      return {
        status: true,
        message: 'Success.',
      };
    } catch {
      return {
        status: false,
        message:
          'You must add a SendGrid Function Endpoint URL.  Contact your developer to add this value.',
      };
    }
  }
}

async function saveForm(data) {
  //Send to Cosmic
  const params = {
    type_slug: 'form-submissions',
    title: data.name,
    content: data.message,

    metafields: [
      {
        title: 'Email',
        key: 'email',
        type: 'text',
        value: data.email,
      },
      {
        title: 'Phone',
        key: 'phone',
        type: 'text',
        value: data.phone,
      },
    ],
  };
  console.log('params', params);
  // Write to Cosmic Bucket (Optional)
  // const response = await bucket.addObject(params);
}

export default {
  contactForm,
};
