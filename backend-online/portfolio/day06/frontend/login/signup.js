//import { stringify } from "querystring";

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  //1. 입력한 휴대폰 번호 가져오기
  let number1 = document.getElementById("PhoneNumber01").value;
  let number2 = document.getElementById("PhoneNumber02").value;
  let number3 = document.getElementById("PhoneNumber03").value;
  const fullNumber = `${number1}${number2}${number3}`;

  //2. 해당 휴대폰번호로 인증번호 요청
  axios
    .post("http://localhost:3001/tokens/phone", {
      phone: fullNumber,
    })
    .then((res) => {
      document.querySelector("#ValidationInputWrapper").style.display = "flex";
      // 타이머 시작
      document.getElementById("LimitTime").value = "타이머 시작";
      // 인증토큰(res)입력 (아마 다음수업?)
      let realToken = res;
      // if (token == realToken) {
      //   return true;
      // } else {
      //   document.getElementsByClassName("NumberValidationBtn").innerText = "인증 실패";
      // }
      // submitToken()?
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  // 1. 정보 보내기
  let username = document.getElementById("SignupName").value;
  let number1 = document.getElementById("PhoneNumber01").value;
  let number2 = document.getElementById("PhoneNumber02").value;
  let number3 = document.getElementById("PhoneNumber03").value;
  let jumin1 = document.getElementById("SignupPersonal").value;
  let jumin2 = document.getElementById("SignupPersonal2").value;
  let token = document.getElementById("TokenInput").value; //입력한 인증번호
  let realToken = "";
  let site = document.getElementById("SignupPrefer").value;
  let email = document.getElementById("SignupEmail").value;
  let pw = document.getElementById("SignupPwd").value;

  axios
    .post("http://localhost:3001/users", {
      username,
      jumin1,
      jumin2,
      number1,
      number2,
      number3,
      site,
      pw,
      email,
    })
    .then((res) => {
      console.log("회원가입이 완료되었습니다. 가입 축하 메일을 확인해주세요");
    });
};
