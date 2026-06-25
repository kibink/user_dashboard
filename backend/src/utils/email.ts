import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.EMAIL_API_KEY,
});

const sentFrom = new Sender(
  `user-dashboard@${process.env.EMAIL_DOMAIN}`,
  "Klim",
);

export const sendVerificationCode = async (name, email, verificationCode) => {
  const link = `${process.env.CLIENT_URL}/verify-email?verificationCode=${verificationCode}`;

  const recipient = new Recipient(email, name);

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([recipient])
    .setReplyTo(sentFrom)
    .setSubject("User Dashboard verification")
    .setHtml(
      `Greetings, <b>${name}</b>!<br>Verify your email by following this link: <a href="${link}">${link}</a><br>If it wasn't you, then ignore this email.`,
    )
    .setText(
      `Greetings, ${name}!\nVerify your email by following this link: ${link}\nIf it wasn't you, then ignore this email.`,
    );

  await mailerSend.email.send(emailParams);
};
