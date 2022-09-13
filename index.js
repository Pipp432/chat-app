import express from "express";
const app = express();
import { createServer } from "http";
import path from "path";

const server = createServer(app);
const __dirname = path.resolve();
app.use(express.static(__dirname + "/public"));
app.get("/index.html", (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
