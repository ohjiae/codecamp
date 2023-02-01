import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
// express는 json을 처리하지 않음. 그래서 아래 줄처럼 받는 작업을 해줘야함.
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/boards", (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, writer: "철수", title: "제목1", contents: "내용1" },
    { number: 2, writer: "영희", title: "제목2", contents: "내용2" },
    { number: 3, writer: "훈이", title: "제목3", contents: "내용3" },
  ];
  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.phone;
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
    res.send("인증 완료!!");
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
