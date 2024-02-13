import mysql2 from "mysql2";

export const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Purvajit02",
  database: "walkInPortal",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});
