console.log("하이하이");

function createTokenOfPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해 주세요");
  }

  // 2. 핸드폰 토큰 6자리 만들기
  const num = 6;
  if (num == undefined) {
    console.log("숫자 갯수를 제대로 입력해 주세요");
    return;
  } else if (num <= 0) {
    console.log("숫자 갯수가 너무 적습니다");
    return;
  } else if (num > 10) {
    console.log("9 이하의 숫자를 입력해주세요");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** num)).padStart(
    num,
    "0"
  );
  console.log(result);

  // 3. 핸드폰번호에 토큰 전송하기
  console.log(myphone + "번호로 인증번호" + result + "를 전송합니다");
}

createTokenOfPhone("01012345678");
