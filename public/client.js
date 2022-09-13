const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("message-btn");
const idDisplay = document.getElementById("room-id");

let message = "";
var socket = io("http://localhost:3000");
socket.on("connect", () => {});
socket.on("receive-room-id", (roomID) => {
	console.log("sawcon");
	idDisplay.innerHTML = `Your room ID: ${roomID}`;
});
messageInput.addEventListener("change", (event) => {
	message = event.target.value;
});
sendBtn.addEventListener("click", () => {
	socket.emit("send-message", message, roomID);
	messageInput.value = "";
	message = "";
});
