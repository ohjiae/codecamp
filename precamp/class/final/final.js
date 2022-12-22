
// 휴대폰 번호 채워져 있으면 '인증번호 전송'버튼 활성화
// >>>>>>>>엘리먼트를 클래스로 찾으면 안되고 아이디로 찾으면 됨.. 클래스는 중복이되서그런가?
let activateSend = () => {
    let phone1 = document.getElementById("p1").value
    let phone2 = document.getElementById("p2").value
    let phone3 = document.getElementById("p3").value
    if (phone1.length === 3){
        document.getElementById("p2").focus()    
        if (phone2.length === 4){
            document.getElementById("p3").focus()
        }
    }
    if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4){
        document.getElementById("auth__sendbtn__id").disabled = false;
        console.log("활성화")
    } else { 
        document.getElementById("auth__sendbtn__id").disabled = true;
        console.log("비활성화")
    }
}


let isStarted = false
// 인증번호 확인 기능

let startTimer = () => {
    if (isStarted === false){
        isStarted = true
        // 인증번호 생성
        let token = String(Math.floor(Math.random() * 0xffff)).padEnd(6, "0")
        document.getElementById("auth__number").innerText = token

        // 인증확인 버튼 활성화
        document.getElementById("auth__checkbtn__id").disabled = false
        // document.getElementById("auth__sendbtn__id").disabled = true

        // 타이머 시작
        let time = 5
        //원래 180인데 일단 5초로함
        let timer
        clearInterval(timer)
        timer = setInterval(() => { 
            if (time >= 0 && isStarted){
                let min = Math.floor(time / 60)
                let sec = String(time % 60).padStart(2,"0")
                document.getElementById("auth__time").innerText = min + ":" + sec
                time = time - 1
                
            } else {
                document.getElementById("auth__checkbtn__id").disabled = true
                document.getElementById("auth__sendbtn__id").disabled = false
                clearInterval(timer)
                time = 0
                // isStarted = false 이거 풀어도 겹침
                document.getElementById("auth__time").innerText = '3:00'
                document.getElementById("auth__number").innerText = '000000'
               
                // 타이머가 작동중일때 비활성화만하고 한번 더눌러야 시작함...ㅠㅠㅠ
            }
        }, 1000)
    } else {
        // 타이머 작동중일때.
        console.log('타이머 작동중임')
        isStarted = false
        time = 0
        // 그렇다고 여기에 startTimer() 더쓰면 또 겹침... 깨끗한 상태로 시작이 왜안되지?
        //clearInterval(timer)
    }
}

let checkToken = () => {
    let leftTime = document.getElementById("auth__time").innerText
    // 이러면 또 시간 나눠서 체크해야되는데 어차피 시간끝나면 비활성화라 안해도될듯

    alert("인증이 완료되었습니다")
    document.getElementById("auth__check__text").innerText = '인증 완료'
    // document.getElementById("auth__time").innerText = '3:00'
    // 타이머멈추기 어케하냐 흑흣흑
    document.getElementById("signup__btn").disabled = false

}

let submit = () => {
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let pw1 = document.getElementById("pw1").value
    let pw2 = document.getElementById("pw2").value

    let women = document.getElementById("women").checked
    let men = document.getElementById("men").checked
    let area = document.getElementById("selectArea").value

    let checkEmail = () => {
        if (email){
            if (email.includes('@')){
                document.getElementById("error__email").style.color = 'white'
                return true
            } else {
                document.getElementById("error__email").innerText = '@가 포함되어야 합니다.'
                document.getElementById("error__email").style.color = 'red'
            }
        } else {
            document.getElementById("error__email").innerText = '이메일을 입력해 주세요'
            document.getElementById("error__email").style.color = 'red'
        }
    }

    let checkUsername = () => {
        if (username) {
            document.getElementById("error__username").style.color = 'white'
            return true
        } else {
            document.getElementById("error__username").style.color = 'red'
        }
    }

    let checkPW = () => {
        if (pw1 && pw2) {
            if (pw1 === pw2) {
                document.getElementById("error__pw1").style.color = 'white'
                document.getElementById("error__pw2").style.color = 'white'
                return true
            } else {
                document.getElementById("error__pw1").innerText = '비밀번호가 일치하지 않습니다'
                document.getElementById("error__pw1").style.color = 'red'
            }
        } else {
            document.getElementById("error__pw1").innerText = '비밀번호를 입력해 주세요'
            document.getElementById("error__pw1").style.color = 'red'
            document.getElementById("error__pw2").innerText = '비밀번호를 입력해 주세요'
            document.getElementById("error__pw2").style.color = 'red'
        }
    }

    let checkArea = () => {
        if (area !== '지역을 선택하세요'){
            document.getElementById("error__area").style.color = 'white'
            return true
        } else {
            document.getElementById("error__area").style.color = 'red'
        }
    }

    let gender = () => {
        if (women||men){
            document.getElementById("error__gender").style.color = 'white'
            return true
        } else {
            document.getElementById("error__gender").style.color = 'red'
        }
    }

    if (checkEmail() && checkUsername() && checkPW() && gender() && checkArea()){
        alert('코드캠프 가입을 축하합니다.')
    } else {
        checkEmail()
        checkUsername()
        checkPW()
        checkArea()
        gender()
    }
}