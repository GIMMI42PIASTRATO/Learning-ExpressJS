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
	const result = await pool.query("SELECT * FROM url");
	return result;
}

async function getURL(id) {
	const result = await pool.query("SELECT * FROM url WHERE id_url = ?", [id]);
	return result;
}

// URL: the full url
// uniqueID: Random generated id that serves to recognize which is its associated url when a get request is made on the shortened url
async function writeNewURL(url, uniqueID) {
	const result = await pool.query(
		`
		INSERT INTO url (long_url, short_url)
		VALUE (?, ?)
	`,
		[url, uniqueID]
	);
	return result;
}

module.exports = {
	getURLS,
	getURL,
	writeNewURL,
};
