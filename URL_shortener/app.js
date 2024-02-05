const express = require("express");
const path = require("path");
const app = express();

app.listen(process.env.port || 3000, () => {
	console.log("App is listening on http://localhost:3000");
});

app.set("view engine", "ejs");

// By default app.set("view engine", "ejs"); it goes and looks for the views folder inside the root, here we specify instead to look for it inside the folder we are in
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));

app.get("/", (req, res) => {
	res.render("index");
});

console.log(__dirname);
