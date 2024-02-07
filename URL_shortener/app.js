const express = require("express");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();

app.listen(process.env.port || 3000, () => {
	console.log("App is listening on http://localhost:3000");
});
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// By default app.set("view engine", "ejs"); it goes and looks for the views folder inside the root, here we specify instead to look for it inside the folder we are in
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/shrink", (req, res) => {
	const longURL = req.body.url;
	const uniqueID = nanoid(7);
	console.log(uniqueID);
	res.redirect("/");
});
