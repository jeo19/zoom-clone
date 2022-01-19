const messageList = document.querySelector("ul");
const messageForm = document.querySelector("message");
const nickForm = document.querySelector("nickname");
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(input.value);
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
