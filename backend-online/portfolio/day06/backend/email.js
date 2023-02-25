import { getToday, checkAllTrue } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkAllInfo(user) {
  // 1. 다 채워졌는지 확인
  let { username, jumin1, jumin2, site, pw, email } = user;

  while (!checkAllTrue(user)) {
    checkAllTrue(user);
  }

  // 2. 이메일 @ 포함여부 확인
  let checkEmail = () => {
    if (email) {
      if (email.includes("@")) {
        return true;
      } else {
        console.log("@가 포함되어야 합니다.");
      }
    } else {
      console.log("이메일 입력란을 확인해 주세요");
    }
  };
}

export function getWelcomeTemplate(user) {
  let { username, phone, site } = user;
  return `
          <html>
              <body>
                  <h1>${username}님 가입을 환영합니다</h1>
                  <hr />
                  <div>이름: ${username}</div>
                  <div>전화번호: ${phone}</div>
                  <div>좋아하는 사이트: ${site}</div>
                  <div>가입일: ${getToday()}</div>
              </body>
          </html>
      `;
}

export async function sendTemplateToEmail(email, myTemplate) {
  console.log(email + "이메일로" + myTemplate + "를 전송합니다.");
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다!",
    html: myTemplate,
  });
}
