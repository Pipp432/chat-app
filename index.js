import express from "express";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "http";

const __dirname = path.resolve();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.get("/index.html", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

io.on("connection", (socket) => {
	let roomID = String(Math.floor(Math.random() * 10000) + 1);
	socket.join(roomID);

	console.log(roomID);
	socket.emit("receive-room-id", roomID);
	console.log("a user connected");

	socket.on("send-message", (message, roomID, clientID) => {
		socket.to(roomID).emit("receive-message", message, clientID);
	});

	socket.on("connect-to-room", (connectId, clientID) => {
		console.log(`connected: ${connectId} with ${clientID}`);
		socket.join(connectId);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
