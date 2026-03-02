import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  await prisma.contactMessage.create({
    data: { name, email, phone, subject, message },
  })

  try {
    await sendContactNotification({ name, email, phone, subject, message })
  } catch (e) {
    console.error('Contact email failed:', e)
  }

  return NextResponse.json({ success: true })
}
