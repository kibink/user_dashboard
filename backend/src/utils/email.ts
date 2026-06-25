import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationCode = async (name, email, verificationCode) => {
  const link = `${process.env.CLIENT_URL}/verify-email?verificationCode=${verificationCode}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "User Dashboard verification",
    text: `Greetings, ${name}!\nVerify your email by following this link: ${link}\nIf it wasn't you, then ignore this email.`, // plain text body
    html: `Greetings, <b>${name}</b>!<br>Verify your email by following this link: <a href="${link}">${link}</a><br>If it wasn't you, then ignore this email.`, // HTML body
  });
};
