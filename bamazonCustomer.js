var mysql = require('mysql');
var inquirer = require('inquirer');

let productID;
let prodQuantity;


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
        for (let i = 0; i < res.length; i++) {
          console.log("ID#" + res[i].id + " " + res[i].product_name + " " + res[i].price);
        }
        console.log("-----------------------------------\n");
        console.log("Hit space to continue.\n");
      });
      whatchaWant();
  }

  function whatchaWant() {
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "What is id of the item you wish to purchase?\n",
        name: "id"
      },
      {
      type: "input",
      message: "How many units would you like to buy?\n",
      name: "quantity"
    },
     
    ])
      .then(function(inquirerResponse) {
        productID = inquirerResponse.id;
        prodQuantity = inquirerResponse.quantity;
        connection.query("SELECT stock_quantity FROM products WHERE id = " + productID, function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            if (res[0].stock_quantity > prodQuantity) {
                bought(productID, prodQuantity);
            }
            else {
                console.log("Insufficient inventory to complete order.\n")
                prodDisplay();
            }
          });
        //bought(productID, prodQuantity);
        
        
      
      });
  }

  function bought(productID, prodQuantity) {
    var query = connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [
            
              prodQuantity
            ,
            
              productID
            
          ],
        function(err, res) {
            
          console.log("Your order has been submitted");
          purchase(productID, prodQuantity);
        }
      );
  }

  function purchase() {
    connection.query("SELECT price FROM products WHERE id = " + productID, function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("Your total purchase price is $" + (res[0].price * prodQuantity));
        prodDisplay();
      });
  }