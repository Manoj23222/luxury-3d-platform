import nodemailer from "nodemailer";

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    "ashokm3414@gmail.com,3ddesigner5546@gmail.com";

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

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 16px; background-color: #ffffff;">
        <div style="background: #000000; color: #ffffff; padding: 18px 24px; border-radius: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 20px;">📬 New Project Inquiry from LUX3D</h2>
          <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.8;">Received via Luxury 3D & Photo Studio Contact Form</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 140px; color: #666;">Client Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #000; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Client Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #000; font-weight: 600;">
              <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Subject / Type:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #000;">${data.subject || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #666; vertical-align: top;">Message:</td>
            <td style="padding: 10px 0; color: #111; line-height: 1.6; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || "Your Inquiry to Ashok Meena")}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: bold;">
            ✉️ Reply directly to ${data.name} (${data.email})
          </a>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"LUX3D Studio" <${smtpUser}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `[LUX3D Inquiry] ${data.subject || "New Message"} from ${data.name}`,
      text: `New message from ${data.name} (${data.email}):\n\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      html: htmlContent,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[Email Dispatch Error]:", err);
    return { sent: false, error: err.message };
  }
}
