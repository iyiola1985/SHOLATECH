import { NextResponse } from "next/server";
import { sendMail, NOTIFY_EMAIL } from "@/lib/email";

type ContactBody = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    if (!NOTIFY_EMAIL) {
      return NextResponse.json(
        { error: "Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD (and optionally NOTIFY_EMAIL)." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactBody;
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    await sendMail({
      to: NOTIFY_EMAIL,
      subject: `[SholaTech] Contact form message from ${name.trim()}`,
      text,
      html,
      replyTo: email.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
