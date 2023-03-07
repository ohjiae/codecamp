import axios from "axios"
import cheerio from 'cheerio'

// 블로그 작성 기능
async function createBoardAPI(myData){

    // 1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
    const myUrl = myData.contents.split(" ").filter((el) => (el.includes("http")))[0]

    // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html코드 받아오기 => 스크래핑
    const result = await axios.get(myUrl)

    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
    const $ = cheerio.load(result.data)
    $("meta").each((_, el) => {     // _ 부분은 index. 안쓸것이므로 _로 변수 변경
        if($(el).attr("property")){
            const key = $(el).attr("property").split(":")[1]
            const value = $(el).attr("content")
            console.log(key, value)
        }
    } )
}

const frontendData = {
    title : "하이하이"
    contents: "여기는 https://daum.net 입니다"
}

createBoardAPI(frontendData)