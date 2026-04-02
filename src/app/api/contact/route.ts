import { NextRequest, NextResponse } from "next/server"

type ContactBody = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
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

    // 現時点ではログ保存のみ。将来、メール送信サービス連携に差し替え可能。
    console.log("[CONTACT]", {
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 })
  }
}
