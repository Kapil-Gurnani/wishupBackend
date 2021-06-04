const mysql = require("mysql");
const config = require("./config.json");
const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
connection.connect();

let executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    // connection.connect();

    connection.query(
      query,
      function (error, results, fields) {
        if (error) reject(error);
        resolve(results);
        // connection.end();
      }
    );

  });
}
module.exports = {executeQuery};