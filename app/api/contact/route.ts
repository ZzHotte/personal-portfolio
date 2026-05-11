import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  fullname?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(request: NextRequest) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { fullname, email, message } = body;
  if (
    typeof fullname !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const trimmed = {
    fullname: fullname.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!trimmed.fullname || !trimmed.email || !trimmed.message) {
    return NextResponse.json({ message: "Empty fields" }, { status: 400 });
  }

  if (
    trimmed.fullname.length > 200 ||
    trimmed.email.length > 320 ||
    trimmed.message.length > 8000
  ) {
    return NextResponse.json({ message: "Payload too large" }, { status: 400 });
  }

  // Server-side log (replace with email provider / DB as needed)
  console.info("[contact]", {
    fullname: trimmed.fullname,
    email: trimmed.email,
    preview: trimmed.message.slice(0, 120),
  });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const wh = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trimmed),
    });
    if (!wh.ok) {
      return NextResponse.json(
        { message: "Forward failed" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
