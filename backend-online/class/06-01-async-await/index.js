import axios from "axios";

// 비동기 방식
function fetchPostWaiting() {
  const result = axios.get("http://koreanjson.com/posts/1");
  console.log(result);
  // Promise { <pending> } 반환
  // 데이터를 다 읽어오기전에 아래의 console.log가 실행되어 띄우기 시작하므로
}
fetchPostWaiting();

// 동기 방식
async function fetchPostNotWaiting() {
  const result = await axios.get("http://koreanjson.com/posts/1");
  console.log(result.data);
  // 실제 데이터 반환. result로 해도 반환하지만 많은데이터라 콘솔에 찍혀서 data 부분만 불러옴.
}
fetchPostNotWaiting();
