import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function buildContactEmail(payload: Required<ContactPayload>) {
  const escapedMessage = payload.message.replace(/\n/g, "<br />")
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #0f172a;">
      <h2 style="margin-bottom: 16px;">未来設計ノート お問い合わせ</h2>
      <p><strong>お名前:</strong> ${payload.name}</p>
      <p><strong>メールアドレス:</strong> ${payload.email}</p>
      <p><strong>件名:</strong> ${payload.subject}</p>
      <div style="margin-top: 20px;">
        <strong>内容:</strong>
        <div style="margin-top: 8px; padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
          ${escapedMessage}
        </div>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload
    const name = body.name?.trim() || ""
    const email = body.email?.trim() || ""
    const subject = body.subject?.trim() || ""
    const message = body.message?.trim() || ""

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "必須項目を入力してください。" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim()
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim()
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || process.env.EMAIL_FROM?.trim()

    if (!resendApiKey || !toEmail || !fromEmail) {
      return NextResponse.json({ error: "お問い合わせ送信の設定が未完了です。" }, { status: 500 })
    }

    const resend = new Resend(resendApiKey)
    const emailSubject = `【お問い合わせ】${subject}`

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      html: buildContactEmail({ name, email, subject, message }),
    })

    if (error) {
      return NextResponse.json({ error: "お問い合わせの送信に失敗しました。" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "お問い合わせの送信に失敗しました。" }, { status: 500 })
  }
}
