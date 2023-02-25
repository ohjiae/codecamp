import { getToday } from "./utils.js";
import { checkValidationPhone } from "./phone.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkAllInfo(user) {
  // 1. 정보 확인
  let objName = {
    username: "이름",
    jumin1: "주민번호 앞자리",
    jumin2: "주민번호 뒷자리",
    phone: "휴대폰번호",
    site: "좋아하는 사이트",
    pw: "비밀번호",
    email: "이메일",
  };

  for (let key in user) {
    if (user[key] == "") {
      console.log(`${objName[key]} 입력란을 확인해주세요`);
      return false;
    }
    if (!user.email.includes("@")) {
      console.log("@ 없음");
      return false;
    }
  }
  if (!checkValidationPhone(user.phone)) {
    return false;
  }
  return true;
}

export function getWelcomeTemplate(user) {
  let { username, number1, number2, number3, site } = user;
  return `
          <html>
              <body>
                  <h1>${username}님 가입을 환영합니다</h1>
                  <hr />
                  <div>이름: ${username}</div>
                  <div>전화번호: ${number1} - ${number2} - ${number3}</div>
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
