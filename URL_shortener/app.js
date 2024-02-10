const express = require("express");
const path = require("path");
const { nanoid } = require("nanoid");
const { getURLS, getURL, writeNewURL } = require("./database/database.js");

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

app.get("/:uniqueID", (req, res) => {
	const result = req.params.uniqueID;
	console.log(result);
});

app.post("/shrink", (req, res) => {
	var longURL = req.body.url;
	const uniqueID = nanoid(7);
	const urlRegex = new RegExp(
		"^(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,}(/S*)?$"
	);
	const httpsRegex = new RegExp("^https://");

	// check if the url contains https://, if not it adds it to the begginning of the url
	if (!httpsRegex.test(longURL)) {
		longURL = "https://" + longURL;
	}

	if (urlRegex.test(longURL)) {
		writeNewURL(longURL, uniqueID)
			.then((result) => console.log(result))
			.catch((err) => console.log(err));

		res.redirect("/");
	} else {
		res.redirect("/");
	}
});
