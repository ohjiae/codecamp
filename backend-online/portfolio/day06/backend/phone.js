import coolsms from "coolsms-node-sdk";
import "dotenv/config";

export function checkValidationPhone(phoneNum) {
  if (phoneNum.length !== 10 && phoneNum.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
    return false;
  }
  return true;
}

export function getToken() {
  let myCount = 6;
  const result = String(Math.floor(Math.random() * 10 ** myCount)).padStart(myCount, "0");
  return result;
}

export async function sendTokenToSMS(phoneNum, token) {
  const mySms = coolsms.default; // SDK 가져오기
  const messageService = new mySms(process.env.SMS_KEY, process.env.SMS_SECRET);
  const result = await messageService.sendOne({
    to: phoneNum,
    from: process.env.SMS_SENDER,
    text: `[발신처 이름] 안녕하세요?! 요청하신 인증번호는 [${token}] 입니다.`,
  });

  console.log(phoneNum + "번호로 인증번호" + token + "를 전송합니다");
}
