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

module.exports = {
	getURLS,
	getURL,
};
