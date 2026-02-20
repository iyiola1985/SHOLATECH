import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

/** Recipient for form submissions. Defaults to GMAIL_USER if not set. */
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || GMAIL_USER;

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables."
    );
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
}

export type SendMailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export async function sendMail(options: SendMailOptions): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"SholaTech Website" <${GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo,
  });
}
