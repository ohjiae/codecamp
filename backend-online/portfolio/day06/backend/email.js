import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkAllInfo(user) {
  // 1. 다 채워졌는지 확인
  //let { username, jumin1, jumin2, phone, site, pw, email } = user;
  let { username, jumin1, jumin2, site, pw, email } = user;

  let checkUsername = () => {
    if (username) {
      return true;
    } else {
      console.log("이름을 입력해주세요");
    }
  };

  let checkJumin = () => {
    if (jumin1 && jumin2) {
      // 주민번호 길이체크는...걍..나중에..
      return true;
    } else {
      console.log("주민번호를 입력해주세요");
    }
  };

  let checkSite = () => {
    if (site) {
      return true;
    } else {
      console.log("좋아하는 사이트를 입력해주세요");
    }
  };

  let checkEmail = () => {
    if (email) {
      if (email.includes("@")) {
        return true;
      } else {
        console.log("@가 포함되어야 합니다.");
      }
    } else {
      console.log("이메일을 입력해 주세요");
    }
  };

  let checkPW = () => {
    if (pw) {
      return true;
    } else {
      console.log("비밀번호를 입력해주세요");
    }
  };

  if (
    checkUsername() &&
    checkJumin() &&
    checkSite() &&
    checkEmail() &&
    checkPW()
  ) {
    return true;
  } else {
    checkUsername();
    checkJumin();
    checkToken();
    checkSite();
    checkEmail();
    checkPW();
  }
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

export async function sendTemplateToEmail(email, mytemplate) {
  console.log(email + "이메일로" + mytemplate + "를 전송합니다.");
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
    html: mytemplate,
  });
}
