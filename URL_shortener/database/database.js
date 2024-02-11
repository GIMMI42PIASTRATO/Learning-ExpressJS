const mysql = require("mysql2");

const pool = mysql
	.createPool({
		host: "localhost",
		user: "root",
		password: "",
		database: "ulr-shortener",
	})
	.promise();

async function getURLS() {
	const [result] = await pool.query("SELECT * FROM url");
	return result;
}

// Just for testing
async function getURL(id) {
	const [result] = await pool.query("SELECT * FROM url WHERE id_url = ?", [
		id,
	]);
	return result[0];
}

// To retrieve the url from from the database when a user makes a request using the shortened link
async function getUrlByUniqueId(uniqueID) {
	const [result] = await pool.query(
		"SELECT * FROM url WHERE unique_url_id = ?",
		[uniqueID]
	);
}

// URL: the full url
// uniqueID: Random generated id that serves to recognize which is its associated url when a get request is made on the shortened url
async function writeNewURL(url, shortURL, uniqueID) {
	const result = await pool.query(
		`
		INSERT INTO url (long_url, short_url, unique_url_id)
		VALUE (?, ?, ?)
	`,
		[url, shortURL, uniqueID]
	);
	return result;
}

module.exports = {
	getURLS,
	getURL,
	writeNewURL,
};
