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

export function sendTokenToSMS(phoneNum, sentNum) {
  console.log(phoneNum + "번호로 인증번호" + sentNum + "를 전송합니다");
}
