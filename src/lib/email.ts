import nodemailer from "nodemailer";

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL || "ashokm3414@gmail.com";

  // Check for SMTP credentials in .env.local
  const smtpUser =
    process.env.EMAIL_USER ||
    process.env.GMAIL_USER ||
    process.env.SMTP_USER;
  const smtpPass =
    process.env.EMAIL_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (!smtpUser || !smtpPass) {
    console.warn(
      "[Email Service] SMTP credentials (EMAIL_USER / EMAIL_PASS) not configured in .env.local. Inquiry safely stored in MongoDB."
    );
    return {
      sent: false,
      reason:
        "SMTP credentials (EMAIL_USER, EMAIL_PASS) not configured in .env.local. Inquiry saved to database.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const cleanSubject = data.subject?.trim() || "Project Opportunity";
    const subjectLine = cleanSubject.toLowerCase().startsWith("re:")
      ? cleanSubject
      : `Re: ${cleanSubject}`;

    const cleanMessage = data.message?.trim() || "";

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px 0;">
        <p style="margin: 0 0 16px 0; font-size: 15px; color: #111111;">Hi Ashok,</p>
        
        <div style="white-space: pre-wrap; margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #111111;">${cleanMessage}</div>

        <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #222222;">
          Thank you,<br />
          <strong style="color: #000000;">${data.name}</strong><br />
          <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
        </p>

        <div style="margin-top: 36px; padding-top: 14px; border-top: 1px solid #eeeeee; font-size: 11px; color: #888888;">
          (This is an inquiry message sent via your portfolio contact form.)
        </div>
      </div>
    `;

    const plainText = `Hi Ashok,\n\n${cleanMessage}\n\nThank you,\n${data.name}\n${data.email}\n\n(This is an inquiry message sent via your portfolio contact form.)`;

    const info = await transporter.sendMail({
      from: `"${data.name}" <${smtpUser}>`,
      to: adminEmail,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: subjectLine,
      text: plainText,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[Email Dispatch Error]:", err);
    return { sent: false, error: err.message };
  }
}
