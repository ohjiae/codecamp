let isStarted = false

let auth = () => {

    if(isStarted === false){
        // 타이머가 작동중이 아닐때
        isStarted = true
        document.getElementById("doneBtn").disabled = false
        // 타이머 작동 시작 
        let token = String(Math.floor(Math.random() * 0xfffff)).padEnd(6,"0")
        document.getElementById("number").innerText = token
    
        let time = 180
        let timer 

        timer = setInterval(function(){
            if (time >= 0){
                let min = Math.floor(time / 60)
                let sec = String(time % 60).padStart(2,"0")
                document.getElementById("timer").innerText = min + ":" + sec
                time = time - 1
            }else{
                document.getElementById("doneBtn").disabled = true
                isStarted = false
                clearInterval(timer) 
                // clearInterval로 타이머를 멈춰줘야 0초 이후에 계속해서 else문이 돌지않음.
                // 위의 clearInterval이 없을때, 
                // console.log('타이머 작동중')  
                // 이것을 주석처리하지않고 실행시켰을 경우, '타이머작동중'이 콘솔에서 매 1초마다 계속 실행됨을 알수있음.
                // 이로 인해 타이머가 0초일 때 반짝 하고 살짝 활성화 됐다가 다시 비활성화 되며, 에러의 여지도 있으므로
                // 확실히 타이머를  timer 변수에 넣고 멈춰주는 것.
            }
        } ,1000)

    } else {
        // 타이머가 작동중일때
    }
}