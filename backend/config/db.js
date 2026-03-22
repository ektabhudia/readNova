import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", // or "localhost"
  user: "root", // your MySQL username
  password: "ektab", // your MySQL password
  database: "readnovapro", // your DB name
  port: 3306, // your MySQL port
});

export default db;
