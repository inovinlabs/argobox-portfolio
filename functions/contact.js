export async function onRequestPost(context) {
  try {
    const { name, email, subject, message } = await context.request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'contact@argobox.com',
        to: 'daniel.laforce@gmail.com',
        subject: `Contact Form: ${subject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h4>Message:</h4>
          <p>${message}</p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 