const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone() {
  console.log("backend done");
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
