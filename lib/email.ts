import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOrderConfirmationEmail(order: {
  orderNumber: string
  customerName: string
  email: string
  total: number
  items: Array<{ name: string; quantity: number; price: number }>
}) {
  const itemsHtml = order.items.map(i => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee;">${i.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${i.price.toFixed(2)}</td>
    </tr>
  `).join('')

  await transporter.sendMail({
    from: '"Ashok 9 Cards Subhamasthu" <info@ashok9cards.com>',
    to: order.email,
    subject: `Order Confirmed — #${order.orderNumber} | Ashok 9 Cards Subhamasthu`,
    html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family:'Noto Serif',serif;background:#EFE6D2;padding:20px;margin:0;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.1);">
        <div style="background:linear-gradient(135deg,#800000,#6b0000);padding:30px;text-align:center;">
          <h1 style="color:#D4AF37;font-family:Playfair Display,serif;margin:0;font-size:28px;">Ashok 9 Cards</h1>
          <p style="color:#EFE6D2;margin:5px 0 0;">Subhamasthu</p>
        </div>
        <div style="padding:30px;">
          <h2 style="color:#800000;font-family:Playfair Display,serif;">Order Confirmed! 🎊</h2>
          <p>Dear ${order.customerName},</p>
          <p>Thank you for choosing <strong>Ashok 9 Cards Subhamasthu</strong> for your special occasion. Your order has been received and is being reviewed by our team.</p>
          <div style="background:#EFE6D2;padding:15px;border-radius:6px;margin:20px 0;">
            <strong>Order Number: #${order.orderNumber}</strong>
          </div>
          <table width="100%" style="border-collapse:collapse;">
            <thead>
              <tr style="background:#800000;color:#D4AF37;">
                <th style="padding:10px;text-align:left;">Product</th>
                <th style="padding:10px;text-align:center;">Qty</th>
                <th style="padding:10px;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="text-align:right;margin-top:15px;">
            <strong style="font-size:18px;color:#800000;">Total: ₹${order.total.toLocaleString('en-IN')}</strong>
          </div>
          <div style="margin-top:25px;padding:20px;border:1px dashed #D4AF37;border-radius:6px;background:#fefce8;">
            <h3 style="color:#800000;margin-top:0;">Next Steps:</h3>
            <ol>
              <li>Our design team will prepare a proof within 24–48 hours.</li>
              <li>You'll receive the digital proof via email and WhatsApp for approval.</li>
              <li>Once approved, printing begins immediately.</li>
              <li>Your order will be shipped within 5–7 business days.</li>
            </ol>
          </div>
          <p>For any queries, contact us:</p>
          <p>📞 <strong>+91-XXXXXXXXXX</strong> | 📧 <strong>info@ashokcards.com</strong></p>
        </div>
        <div style="background:#800000;padding:20px;text-align:center;color:#EFE6D2;">
          <p style="margin:0;">Ashok 9 Cards Subhamasthu | #3-3-832, Bazar Road, Secunderabad, Telangana 500003</p>
          <p style="margin:5px 0 0;color:#D4AF37;">Premium Traditional South Indian Wedding Invitations — Crafted with Devotion.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  })
}

export async function sendStatusUpdateEmail(order: {
  orderNumber: string
  customerName: string
  email: string
  status: string
  statusLabel: string
}) {
  await transporter.sendMail({
    from: '"Ashok 9 Cards Subhamasthu" <info@ashok9cards.com>',
    to: order.email,
    subject: `Order Update: ${order.statusLabel} — #${order.orderNumber}`,
    html: `
    <div style="font-family:'Noto Serif',serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:linear-gradient(135deg,#800000,#6b0000);padding:20px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#D4AF37;margin:0;">Ashok 9 Cards Subhamasthu</h1>
      </div>
      <div style="background:#fff;padding:25px;border:1px solid #eee;">
        <h2>Order Status Update</h2>
        <p>Dear ${order.customerName},</p>
        <p>Your order <strong>#${order.orderNumber}</strong> status has been updated to:</p>
        <div style="background:#800000;color:#D4AF37;padding:15px;text-align:center;border-radius:6px;font-size:18px;font-weight:bold;">
          ${order.statusLabel}
        </div>
        <p style="margin-top:20px;">If you have questions, reply to this email or WhatsApp us at +91-XXXXXXXXXX.</p>
      </div>
    </div>
    `,
  })
}

export async function sendContactNotification(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  await transporter.sendMail({
    from: '"Ashok 9 Cards Website" <info@ashok9cards.com>',
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: `[Contact Form] ${data.subject}`,
    html: `
    <div style="font-family:'Noto Serif',serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#800000;">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;color:#800000;">Name:</td><td style="padding:8px;">${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#800000;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#800000;">Phone:</td><td style="padding:8px;">${data.phone ?? '—'}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#800000;">Subject:</td><td style="padding:8px;">${data.subject}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#EFE6D2;border-radius:6px;">
        <strong style="color:#800000;">Message:</strong>
        <p style="margin-top:8px;">${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    `,
  })
}
