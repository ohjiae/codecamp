import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

const app = express();

app.use(cors());

// - json 모듈 설정
app.use(express.json());

// - swagger 모듈 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/boards", async (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    // const result = [
    //     { number: 1, writer: "철수", title: "제목1", contents: "내용1" },
    //     { number: 2, writer: "영희", title: "제목2", contents: "내용2" },
    //     { number: 3, writer: "훈이", title: "제목3", contents: "내용3" },
    // ];
    const result = await Board.find();

    // 2. 꺼내온 결과 응답 주기
    res.send(result);
});

app.post("/boards", async (req, res) => {
    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents,
    });
    await board.save();

    // 2. 저장 결과 응답 주기
    res.send("게시물 등록에 성공하였습니다");
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

// 몽고DB 접속!!
mongoose.connect("mongodb://my-database:27017/mydocker03");

// Backend API 서버 오픈!!
app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
