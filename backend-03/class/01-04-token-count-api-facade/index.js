function checkValidationPhone(phoneNum) {
  if (phoneNum.length !== 10 && phoneNum.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
    return false;
  } else {
    return true;
  }
}

function getToken() {
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

function sendTokenToSMS(phoneNum, sentNum) {
  console.log(phoneNum + "번호로 인증번호" + sentNum + "를 전송합니다");
}

function createTokenOfPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);

  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
  }
}

createTokenOfPhone("01012345678");
