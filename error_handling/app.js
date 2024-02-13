const express = require("express");
const app = express();

app.listen(3000, () =>
	console.log("App is listening on http://localhost:3000")
);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/error", (req, res) => {
	throw new Error("BROKEN BUT HANDLED BY EXPRESS");
});

app.get("async-error", async (req, res, next) => {
	next(new Error("BROKEN BUT HANDLED BY ME"));
});

app.use((error, req, res, next) => {
	console.log(error);
	next(error);
});
