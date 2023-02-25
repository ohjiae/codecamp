import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkAllInfo, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// 1. 회원목록 조회 API
app.get("/users", (req, res) => {
  const profiles = [
    {
      email: "aaa@aaa.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "Nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Judy@Judy.com",
      name: "Judy",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Anna@anna.com",
      name: "Anna",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "Elsa@elsa.com",
      name: "elsa",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];
  res.send(profiles);
});

// 2. 커피목록 조회 API

app.get("/starbucks", (req, res) => {
  const coffeeList = [
    { name: "아메리카노", kcal: 5 },
    { name: "카페라떼", kcal: 10 },
    { name: "콜드브루", kcal: 15 },
    { name: "카페모카", kcal: 50 },
    { name: "돌체라떼", kcal: 500 },
    { name: "카라멜라떼", kcal: 200 },
    { name: "에스프레소", kcal: 1 },
    { name: "디카페인", kcal: 5 },
    { name: "오트라떼", kcal: 300 },
    { name: "오트라떼", kcal: 300 },
  ];
  res.send(coffeeList);
});

// 3. 휴대폰 인증 토큰 발급 API

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.phone;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send(mytoken);
  }
});

// 4. 가입환영 이메일 API

app.post("/users", (req, res) => {
  const user = req.body;
  // 1. 이메일이 정상인지 확인
  const isValid = checkAllInfo(user);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate);
    res.send("가입 완료");
  }
});

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`);
});
