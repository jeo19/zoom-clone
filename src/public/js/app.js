const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

function showRoom(msg) {
  welcome.hidden = true;
  room.hidden = false;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
