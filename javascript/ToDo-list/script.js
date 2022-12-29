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
  if (window.event.keyCode === 13 && todoInput.value !== "") {
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

const accessToGeo = function (position) {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  console.log(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    alert("위치 정보를 허용해주세요");
  });
};

askForLocation();
