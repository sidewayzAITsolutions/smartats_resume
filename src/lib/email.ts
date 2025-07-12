// @ts-ignore
const { Resend } = require('resend');

// lib/email.ts

export async function sendWelcomeEmail(email: string, name: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'SmartATSResume <noreply@smartatsresume.com>',
    to: email,
    subject: 'Welcome to SmartATSResume!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>You're now ready to create ATS-optimized resumes that get you hired.</p>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/builder">Start Building Your Resume</a>
    `,
  });
}
