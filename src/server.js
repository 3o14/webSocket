import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express(); // express 서버 열기

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// public : 깃에 공개할 폴더
// static 설정 ?
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
// -> 루트(/)에 들어갔을 때 home 파일 렌더링하기
app.get("/*", (_, res) => res.redirect("/"));
// -> 어떤 url로 들어가던지 home으로 돌려보냄 -> home 하나만 사용할 것임

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app); // http 서버 만들기
// const 서버 = http.crateServer(express로 만든 서버)
const wss = new WebSocket.Server({ server }); // 웹소켓 서버 만들기
// const ws서버 = new WebSocket.Server ( http 서버 ) http 서버를 넣으면 http와 웹소켓 서버 두 개를 동시에 돌릴 수 있다.

// 양방향 소통을 위한 fake database
const sockets = [];

// 웹소켓 이벤트 종류: close, error, connection, headers, listening
// wss.on("이벤트", 함수 ) : 이벤트가 발생하면 함수가 실행된다. (javascript에서 addEventListner과 비슷함)
wss.on("connection", (socekt) => {
  sockets.push(socket); // socket을 fake DB인 array에 넣음
  socket["nickname"] = "익명";
  // 클로즈 이벤트가 발생
  socket.on("close", () => {
    console.log("서버 꺼짐");
  });
  // 백엔드에서 프론트로 메시지 보내기
  socket.on("message", (msg) => {
    // string 형식으로 받아온 object 데이터를 다시 JSON으로 파싱
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message": // 데이터가 message일 경우
        sockets.forEach((aSocket) => // sockets array의 모든 요소(socket)에 [닉네임: 메시지] 형태의 데이터 send
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname": // 데이터가 nickname일 경우
        socket["nickname"] = message.payload; // 닉네임을 socket에 넣어주기
    }
  });
});

server.listen(3000, handleListen);
