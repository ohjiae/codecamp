import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";
import { tokens } from "./models/token.model.js";

const app = express();

app.use(cors());

// - json 모듈 설정
app.use(express.json());

// - swagger 모듈 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get("/boards", async (req, res) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
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

app.post("/tokens/phone", async (req, res) => {
    const myphone = req.body.phone;
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);

    if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken();

        // 3. 핸드폰 번호 DB내 있는지 확인 후 있으면 인증토큰 업데이트
        const findOne = await tokens.findOneAndUpdate(
            { phone: req.body.phone }, // 찾을 조건
            { token: mytoken } // 업데이트할 내용
        );

        // 4. 없으면 새로 만들기
        if (!findOne) {
            console.log("못찾았으니까 새거만들게 ");
            const oneToken = new tokens({
                token: mytoken,
                phone: req.body.phone,
                isAuth: false,
            });
            await oneToken.save();
        } else {
            console.log(`찾아서 업뎃한 폰번호 : ${findOne.phone}`);
            console.log(`찾아서 업뎃한 토큰: ${findOne.token}`);
        }
        // 5. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken);
        res.send(`${myphone}으로 인증 문자가 전송되었습니다.`);
    }
});

app.patch("/tokens/phone", async (req, res) => {
    // req받을때 핸드폰번호와 마지막 인증토큰 전달.
    // req에서 받은 폰번호를 tokens 문서에서 찾아봄.
    const findPhone = await tokens.findOne({ phone: req.body.phone });
    console.log(`findPhone 결과 = ${findPhone}`);
    if (!findPhone) {
        res.send(false);
    } else if (req.body.token != findPhone.token) {
        console.log(`ㄴㄴㄴㄴㄴㄴㄴㄴㄴ: 
        findphone = ${findPhone} 
        마지막 인증토큰 = ${req.body.token}
        저장되어있는 토큰 = ${findPhone.token}`);
        res.send(false);
    } else {
        console.log(`토큰이 일치해요옹 인증완료!`);
    }
    await tokens.updateOne({ phone: req.body.phone }, { isAuth: true });
    res.send(true);
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
