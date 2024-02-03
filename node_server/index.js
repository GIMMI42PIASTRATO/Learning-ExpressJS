const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	fs.readFile("node_server\\data.json", (error, data) => {
		if (error) {
			res.write("Error: File not found");
		} else {
			res.write(data);
		}
		res.end();
	});
});

const PORT = 3000;

server.listen(PORT, (error) => {
	if (error) {
		console.log("An error occured: " + error);
	} else {
		console.log("Server is listening on port 3000");
	}
});
