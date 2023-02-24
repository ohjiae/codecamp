import coolsms from "coolsms-node-sdk";
import "dotenv/config";

export function checkValidationPhone(phoneNum) {
  if (phoneNum.length !== 10 && phoneNum.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const mycount = 6;
  if (mycount == undefined) {
    console.log("숫자 갯수를 제대로 입력해 주세요");
    return;
  } else if (mycount <= 0) {
    console.log("숫자 갯수가 너무 적습니다");
    return;
  } else if (mycount > 10) {
    console.log("9 이하의 숫자를 입력해주세요");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** mycount)).padStart(
    mycount,
    "0"
  );
  return result;
}

export async function sendTokenToSMS(phoneNum, token) {
  const SMS_SENDER = "01098765432"; // coolsms에서 발신번호로 등록한 번호

  const mysms = coolsms.default; // SDK 가져오기
  const messageService = new mysms(process.env.SMS_KEY, process.env.SMS_SECRET);
  const result = await messageService.sendOne({
    to: phoneNum,
    from: process.env.SMS_SENDER,
    text: `[발신처 이름] 안녕하세요?! 요청하신 인증번호는 [${token}] 입니다.`,
  });

  //console.log(phoneNum + "번호로 인증번호" + token + "를 전송합니다");
}
