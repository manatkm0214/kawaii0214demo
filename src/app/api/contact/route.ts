import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody

    const name = body.name?.trim() || ""
    const email = body.email?.trim() || ""
    const subject = body.subject?.trim() || ""
    const message = body.message?.trim() || ""

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 })
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim()
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim()
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || "Kakeibo Contact <onboarding@resend.dev>"

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { error: "お問い合わせ送信の設定が未完了です（RESEND_API_KEY / CONTACT_TO_EMAIL）" },
        { status: 503 },
      )
    }

    const resend = new Resend(resendApiKey)
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />")

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[お問い合わせ] ${subject}`,
      text: `お名前: ${name}\nメール: ${email}\n件名: ${subject}\n\n内容:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.7; color: #0f172a;">
          <h2>お問い合わせを受信しました</h2>
          <p><strong>お名前:</strong> ${safeName}</p>
          <p><strong>メール:</strong> ${safeEmail}</p>
          <p><strong>件名:</strong> ${safeSubject}</p>
          <hr />
          <p><strong>内容:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: "メール送信に失敗しました。時間をおいて再試行してください" }, { status: 502 })
    }

    console.log("[CONTACT_SENT]", { email, subject, receivedAt: new Date().toISOString() })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 })
  }
}
