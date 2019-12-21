let {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

let url = "";
if (DB_PASSWORD || DB_USERNAME) {
  url =
    DB_CONNECTION +
    "://" +
    DB_USERNAME +
    ":" +
    DB_PASSWORD +
    "@" +
    DB_HOST +
    ":" +
    DB_PORT +
    "/" +
    DB_DATABASE;
} else {
  url = DB_CONNECTION + "://" + DB_HOST + ":" + DB_PORT + "/" + DB_DATABASE;
}

module.exports = {
  database: url
};
