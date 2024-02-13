const express = require("express");
const path = require("path");
const { nanoid } = require("nanoid");
const {
	getURLS,
	writeNewURL,
	getUrlByUniqueId,
	updateData,
} = require("./database/database.js");

const app = express();

app.listen(process.env.port || 3000, () => {
	console.log("App is listening on http://localhost:3000");
});
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// By default app.set("view engine", "ejs"); it goes and looks for the views folder inside the root, here we specify instead to look for it inside the folder we are in
app.set("views", path.join(__dirname, "views"));
app.use(express.static("views"));

app.get("/", async (req, res) => {
	const URLS = await getURLS();
	res.render("index", { data: { URLS: URLS } });
});

app.get("/:uniqueID", async (req, res) => {
	const uniqueID = req.params.uniqueID;
	const result = await getUrlByUniqueId(uniqueID);
	if (result) {
		updateData(
			"url",
			"clicked",
			result.clicked + 1,
			"id_url",
			result.id_url
		);
		res.redirect(result.long_url);
	} else {
		res.sendStatus(404);
	}
});

app.post("/shrink", async (req, res) => {
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
		shortURL = "http://localhost:3000/" + uniqueID;
		writeNewURL(longURL, shortURL, uniqueID)
			.then((result) => console.log(result))
			.catch((err) => console.log(err));

		const URLS = await getURLS();
		console.log(URLS);
		res.render("index", { data: { URLS: URLS, success: true } });
	} else {
		const URLS = await getURLS();
		res.render("index", {
			data: { URLS: URLS, errURL: longURL },
		});
	}
});
