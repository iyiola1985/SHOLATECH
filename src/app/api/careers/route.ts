import { NextResponse } from "next/server";
import { sendMail, NOTIFY_EMAIL } from "@/lib/email";
import { careerRoles } from "@/data/config";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isAllowedCv(file: File): boolean {
  if (ALLOWED_CV_TYPES.has(file.type)) return true;
  const name = file.name.toLowerCase();
  return name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
}

export async function POST(request: Request) {
  try {
    if (!NOTIFY_EMAIL) {
      return NextResponse.json(
        {
          error:
            "Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD (and optionally NOTIFY_EMAIL).",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim() || undefined;
    const role = String(formData.get("role") || "").trim();
    const portfolio = String(formData.get("portfolio") || "").trim() || undefined;
    const coverNote = String(formData.get("coverNote") || "").trim();
    const cv = formData.get("cv");

    if (!name || !email || !role || !coverNote) {
      return NextResponse.json(
        { error: "Name, email, role, and cover note are required." },
        { status: 400 }
      );
    }

    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: "Please upload your CV / resume." }, { status: 400 });
    }

    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: "CV must be 5 MB or smaller." }, { status: 400 });
    }

    if (!isAllowedCv(cv)) {
      return NextResponse.json(
        { error: "CV must be a PDF, DOC, or DOCX file." },
        { status: 400 }
      );
    }

    const roleMeta = careerRoles.find((r) => r.id === role);
    const roleLabel = roleMeta ? roleMeta.title : role;
    const cvBuffer = Buffer.from(await cv.arrayBuffer());

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Role: ${roleLabel}`,
      portfolio ? `Portfolio / LinkedIn: ${portfolio}` : null,
      `CV attached: ${cv.name}`,
      "",
      "Cover note:",
      coverNote,
    ].filter(Boolean);

    const text = lines.join("\n");
    const html = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Role:</strong> ${escapeHtml(roleLabel)}</p>
      ${portfolio ? `<p><strong>Portfolio / LinkedIn:</strong> ${escapeHtml(portfolio)}</p>` : ""}
      <p><strong>CV:</strong> ${escapeHtml(cv.name)} (attached)</p>
      <p><strong>Cover note:</strong></p>
      <p>${escapeHtml(coverNote).replace(/\n/g, "<br>")}</p>
    `;

    await sendMail({
      to: NOTIFY_EMAIL,
      subject: `[SholaTech Careers] ${roleLabel} — ${name}`,
      text,
      html,
      replyTo: email,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
          contentType: cv.type || undefined,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Careers form error:", err);
    return NextResponse.json(
      { error: "Failed to send your application. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
