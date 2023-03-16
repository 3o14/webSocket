const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

// 백엔드와 통신하기
// window.location.host : 현재위치 "localhost:3000" 을 알려줌
const socket = new WebSocket(`ws://${window.location.host}`);

// 데이터를 오브젝트 형식으로 만들어주는 함수
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
  // 백에 전달할 데이터는 string이어야 하기 때문에 object -> string 변환 후 Return
}

// 소켓 이벤트 네 가지: close, error, message, open
// socket.addEventListener("이벤트", 함수) : 해당 이벤트가 발생하면 함수를 수행함
socket.addEventListener("open", () => {
  console.log("서버와 연결되었습니다.");
});

// 백에서 메시지 받아오기
socket.addEventListener("message", (msg) => {
  const li = document.createElement("li");
  li.innerText = msg.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("서버와의 연결이 끊어졌습니다.");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
