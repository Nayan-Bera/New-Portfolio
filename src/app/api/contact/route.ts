import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO || process.env.SMTP_FROM, 
      subject: `New message from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
  <div style="margin:0; padding:0; background:#f6f7f9; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f9; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="text-align:center; padding-bottom:20px;">
                <h1 style="font-size:22px; font-weight:700; color:#222; margin:0;">
                  📩 New Portfolio Message
                </h1>
                <p style="color:#555; font-size:14px; margin-top:6px;">
                  Someone just filled out your portfolio contact form!
                </p>
              </td>
            </tr>

            <!-- User Details Card -->
            <tr>
              <td>
                <div style="
                  background:#f2f7ff;
                  border-left:4px solid #4f87ff;
                  padding:16px 20px;
                  border-radius:6px;
                  margin-bottom:24px;
                ">
                  <p style="margin:0; font-size:14px; color:#333;">
                    <strong>Name:</strong> ${name}
                  </p>
                  <p style="margin:4px 0 0; font-size:14px; color:#333;">
                    <strong>Email:</strong> ${email}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Message Box -->
            <tr>
              <td>
                <h3 style="font-size:16px; color:#222; margin-bottom:10px;">
                  💬 Message:
                </h3>

                <div style="
                  background:#fafafa;
                  border:1px solid #e5e5e5;
                  padding:20px;
                  border-radius:8px;
                  white-space:pre-wrap;
                  font-size:14px;
                  color:#444;
                  line-height:1.6;
                ">
                  ${message.replace(/\n/g, "<br />")}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:30px; text-align:center;">
                <p style="font-size:12px; color:#888; margin:0 0 6px;">
                  You received this email because someone submitted your portfolio contact form.
                </p>
                <p style="font-size:12px; color:#aaa; margin:0;">
                  © ${new Date().getFullYear()} Your Portfolio. All Rights Reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
