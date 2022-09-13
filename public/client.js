const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("message-btn");
const roomIdInput = document.getElementById("room-input");
const connectBtn = document.getElementById("room-btn");
const idDisplay = document.getElementById("room-id");
const chatBox = document.getElementById("chat-box");

let message = "";
let clientID = "";
let connectId = "";
var socket = io("http://localhost:3000");
socket.on("connect", () => {});
socket.on("receive-room-id", (roomID) => {
	idDisplay.innerHTML = `Your room ID: ${roomID}`;
	clientID = roomID;
});
socket.on("receive-message", (message, clientID) => {
	connectId = clientID;
	chatBox.innerHTML += `<h4 class='message'>${clientID}: ${message}</h4>`;
});

messageInput.addEventListener("change", (event) => {
	message = event.target.value;
});
sendBtn.addEventListener("click", () => {
	console.log(message);
	if (connectId) {
		socket.emit("send-message", message, connectId, clientID);
		messageInput.value = "";
		chatBox.innerHTML += `<h4 class='message'>${clientID}: ${message}</h4>`;
		message = "";
	}
});

roomIdInput.addEventListener("change", (event) => {
	connectId = event.target.value;
});

connectBtn.addEventListener("click", () => {
	socket.emit("connect-to-room", connectId, clientID);
});
