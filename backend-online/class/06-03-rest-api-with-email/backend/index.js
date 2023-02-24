import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
// - cors 모듈 설정
//    CORS설정을 하지 않았다면 VScode의 live server로는 오류, 포스트맨으로 보내야함.(모바일에서도 안막힘.= 브라우저를 사용하지 않아서. Q. 모바일에서 크롬 브라우저 어플을 사용하면 막으려나?)
//    CORS(Cross Origin Resource Sharing)
//    > 같은 localhost여도 live server의 포트는 5500인데, 내가 기다리는 포트는 3001번.
//      다른 주소에서 보내졌다면 보안 차원에서 *브라우저*가 막는 기능
//    > 막는 것은 '브라우저'가 하지만, Cors에 대한 설정은 '백엔드'에서 지정.
//    > 1) 특정 url에서 오는 요청만 허용하고 싶다면
//      app.use(cors({
//        origin: "허용하고싶은 사이트 url"
//      }));
//    > 2) 모든 사이트 허용하고 싶다면
app.use(cors());

// - json 모듈 설정
// express는 json을 처리하지 않음. 그래서 아래 줄처럼 받는 작업을 해줘야함. 아래가 처리해주는 모듈
app.use(express.json());

// - swagger 모듈 설정
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

app.post("/users", (req, res) => {
  // 1. 이메일이 정상인지 확인
  const user = req.body.myuser;
  const isValid = checkValidationEmail(user.email);
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
