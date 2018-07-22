var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazondb"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    prodDisplay();
  });

  function prodDisplay() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].id + " " + res[i].product_name + " " + res[i].price);
        }
        console.log("-----------------------------------");
      });
  }