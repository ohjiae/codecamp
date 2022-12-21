// 1번째 문제 :  인증번호 6자리 생성

// 내 답
// function send(){
//     let number = Math.floor(Math.random()*1000000)
//     if (String(number).length < 6){
//         document.getElementById("number").innerText = '0'+number
//     }else{
//         document.getElementById("number").innerText = number
//     }
// }

// 선생님 답
// function send(){
//     const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
//     document.getElementById("number").innerText = token
// }


// 2번째 문제 : 화살표 함수로 변경, 글자 색상 변경, 자바스크립트 파일로 분리

let send = () => {
    const token = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0')
    let colorCode = '#' + Math.round(Math.random() * 0xffffff).toString(16);
    document.getElementById("number").innerText = token;
    document.getElementById("number").style.color = colorCode;
    // 내코드👆. 선생님 코드👇는 colorCode 변수 만들지 않고 그걸 그냥 그대로 색상코드로.
    // document.getElementById("number").style.color = '#'+token;
}