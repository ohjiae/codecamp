let todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    // toggle = 켰다 껐다 스위치같은 느낌. 한번 클릭시 'complete'태그 생기고 또누르면 없어짐
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  //? 를 붙였기 덕분에, undefined나 비정상적인 데이터는 해당하지 않게함.
  // (조건문이 storageData && storageData.complete 인 경우랑 같음)
  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const saveItemsFn = function () {
  const saveItems = [];

  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  //   if (saveItems.length == 0) {
  //     localStorage.removeItem("saved-items");
  //   } else {
  //     // String(매개변수) 함수는 배열은 문자열로 바꿀수 없다.
  //     // saveItems는  배열[]이므로, 배열->텍스트 변환 기능을 지원하는 json을 사용해주어야한다.
  //     // 이렇게 변환한 아이템을 localStorage.setItem(변수이름, 저장할데이터) 로 스토리지에 저장하자
  //     localStorage.setItem("saved-items", JSON.stringify(saveItems));
  //   }

  //위의 if 문 더 간단하게 변환하기
  // 조건문 ? true일때 실행할 내용 : false 일때 실행할 내용
  saveItems.length == 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDataActive = function ({ location, weather }) {
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
};

// *구조분해 할당 적용 2
const weatherSearch = function ({ latitude, longitude }) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bdbf787a33766e70008f0d6d7b37a12c`
  )
    .then((res) => {
      return res.json();
      // JSON.parse 는 응답에 body만 있을때, header나 다른요소도 있으면 res.json()으로 받아야함
    })
    .then((json) => {
      console.log(json);
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.error(err);
    });
};

const accessToGeo = function ({ coords }) {
  const { latitude, longitude } = coords;
  const positionObj = {
    //shorthand property (*구조분해할당 적용 1)
    // 원래 코드
    // latitude : position.coords.latitude
    // longitude : 1)position.2)coords.3)longitude
    // 1) 위의 function(position){~~}의 position 부분 -> ({coords}) 으로 바꿔 맨 앞 position. 부분을 줄임.
    // 2) 아래 const {latitude, longitude} = coords 라인을 새로 넣어
    //    구조분해 할당으로 coords. 부분을 줄임
    // 3) latitude : latitude 같이 키와 값만 남은 상황에서, 키와 값이 같으면 한번만 써도됨 (:와 단어 반복 1개를 생략)
    // =>  최종적으로 변수 이름만 남음. (관련 강의 : 훈훈자바 - 섹션9.구조분해할당 적용)
    latitude,
    longitude,
  };

  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    alert("위치 정보를 허용해주세요");
  });
};

askForLocation();
