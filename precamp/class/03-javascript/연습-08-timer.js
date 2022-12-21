// setTimeout(실행할 함수(), 시연시킬 ms)

setTimeout(function(){
    console.log('펑')
},3000)

// setInterval(실행할 함수(), 몇 ms마다 반복할지)

// let time = 10
// // undefined
// setInterval(function(){
//     if (time >= 0){
//     console.log(time)
//     time = time - 1 
//     }
// },1000)

// 3
// VM1101:3 10
// VM1101:3 9
// VM1101:3 8
// VM1101:3 7
// VM1101:3 6
// VM1101:3 5
// VM1101:3 4
// VM1101:3 3
// VM1101:3 2
// VM1101:3 1
// VM1101:3 0

let time = 180
setInterval(function(){

    if(time >= 0){
        let min = Math.floor(time / 60)
        let sec = String(time % 60).padStart(2,"0")
        console.log(min + ":" + sec)
        time = time - 1
    }
}, 1000)