// netlify/functions/form-submission.js
export default async (req) => {
  const body = await req.json();

  // Netlify sends form fields nested inside a data object
  const name = body.data?.name;
  const email = body.data?.email;
  const message = body.data?.message;

  // Bail out early if any required fields are missing
  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@espa.co.nz',
      to: 'evan.gwilliam@espa.co.nz',
      reply_to: email, // lets you hit reply in outlook and it goes straight back to them
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }),
  });

  if (!res.ok) {
    return new Response('Failed to send email', { status: 500 });
  }

  return new Response('OK', { status: 200 });
};
