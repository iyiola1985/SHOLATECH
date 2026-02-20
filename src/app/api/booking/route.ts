import { NextResponse } from "next/server";
import { sendMail, NOTIFY_EMAIL } from "@/lib/email";

type BookingBody = {
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  description: string;
};

function buildEmailContent(body: BookingBody) {
  const lines = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : null,
    body.businessType ? `Business type: ${body.businessType}` : null,
    body.service ? `Service: ${body.service}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    body.timeline ? `Timeline: ${body.timeline}` : null,
    "",
    "Project description:",
    body.description,
  ].filter(Boolean);

  const text = lines.join("\n");
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    ${body.phone ? `<p><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>` : ""}
    ${body.businessType ? `<p><strong>Business type:</strong> ${escapeHtml(body.businessType)}</p>` : ""}
    ${body.service ? `<p><strong>Service:</strong> ${escapeHtml(body.service)}</p>` : ""}
    ${body.budget ? `<p><strong>Budget:</strong> ${escapeHtml(body.budget)}</p>` : ""}
    ${body.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(body.timeline)}</p>` : ""}
    <p><strong>Project description:</strong></p>
    <p>${escapeHtml(body.description).replace(/\n/g, "<br>")}</p>
  `;
  return { text, html };
}

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

    const body = (await request.json()) as BookingBody;
    const { name, email, description } = body;

    if (!name?.trim() || !email?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and project description are required." },
        { status: 400 }
      );
    }

    const { text, html } = buildEmailContent(body);

    await sendMail({
      to: NOTIFY_EMAIL,
      subject: `[SholaTech] New project request from ${name.trim()}`,
      text,
      html,
      replyTo: email.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking form error:", err);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
