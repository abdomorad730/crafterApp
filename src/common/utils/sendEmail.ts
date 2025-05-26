import { SendMailOptions, createTransport } from "nodemailer";

export const sendEmail = async (data: SendMailOptions) => {
  const transporter = createTransport({
    host: "smtp.gmail.com", // تم التصحيح هنا
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // تجاوز تحقق الشهادة - لا تستخدم في الإنتاج
    },
  });

  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${process.env.EMAIL}>`,
    ...data,
  });

};
/*import { createTransport } from "nodemailer";
import { google } from "googleapis";

// بيانات من Google Cloud وOAuth Playground
const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const SENDER_EMAIL = process.env.EMAIL!;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmail = async (data: any) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = createTransport({
    host: "smtp.gmail.com", // تم التصحيح هنا
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token!,
    },
  });

  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${SENDER_EMAIL}>`,
    ...data,
  });

  console.log("Email sent:", info.messageId);
};*/