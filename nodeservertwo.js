const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "lexxsas",
  database: "sakila",
  password: "Qwepoi91@@@"
});
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
 connection.execute("SELECT * FROM actor",
 function(err, results, fields) {
   console.log(err);
   console.log(results);
   console.log(fields);
});
connection.end();
