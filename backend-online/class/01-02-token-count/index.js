console.log("하이하이");

function getToken(num) {
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
}
