import { NextResponse } from "next/server";
import { sendMail, NOTIFY_EMAIL } from "@/lib/email";
import { addFeedback, getAllFeedback, deleteFeedback } from "@/lib/feedback-store";

type FeedbackBody = {
  name: string;
  email: string;
  type?: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  try {
    const list = await getAllFeedback();
    return NextResponse.json(list);
  } catch (err) {
    console.error("Feedback list error:", err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    if (!NOTIFY_EMAIL) {
      return NextResponse.json(
        { error: "Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD (and optionally NOTIFY_EMAIL)." },
        { status: 500 }
      );
    }
    const body = (await request.json()) as FeedbackBody;
    const { name, email, type, message } = body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    const typeVal = (type && String(type).trim()) || "Other";
    await addFeedback({ name: name.trim(), type: typeVal, message: message.trim() });
    const text = `Name: ${name}\nEmail: ${email}\nType: ${typeVal}\n\nMessage:\n${message}`;
    const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Type:</strong> ${escapeHtml(typeVal)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;
    await sendMail({
      to: NOTIFY_EMAIL,
      subject: `[SholaTech] Client review from ${name.trim()} (${typeVal})`,
      text,
      html,
      replyTo: email.trim(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback form error:", err);
    return NextResponse.json({ error: "Failed to send your review. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = request.headers.get("authorization");
  const secret = process.env.ADMIN_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body?.id === "string" ? body.id.trim() : "";
    if (!id) return NextResponse.json({ error: "Review id is required." }, { status: 400 });
    const deleted = await deleteFeedback(id);
    if (!deleted) return NextResponse.json({ error: "Review not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback delete error:", err);
    return NextResponse.json({ error: "Failed to delete review." }, { status: 500 });
  }
}
