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
    list();
  });

  function list() {
    inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "list",
        message: "Please select an option below.\n",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "query"
      },
      
    ])
      .then(function(inquirerResponse) {
        listItem = inquirerResponse.query;
        switch(listItem) {
            case "View Products":
                prodDisplay();
                break;
            case "View Low Inventory":
                lowInv();
                break;
            case "Add to Inventory":
                //code block
                break;
            case "Add New Product":
                //code block
                break;
            
        }
            
          
        
        
        
      
      });
  }

  function prodDisplay() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].id + " " + res[i].product_name + " " + res[i].price + " " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
        //console.log("Hit any key to continue.\n");
      });
      two = setTimeout(function twoSeconds(){
        list();
       }, 2000);
      
  }

  function lowInv() {
    connection.query("SELECT id, product_name, stock_quantity FROM products WHERE stock_quantity <= 5", function(err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].id + " " + res[i].product_name + " " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
        //console.log("Hit any key to continue.\n");
      });
      two = setTimeout(function twoSeconds(){
       list();
      }, 2000); // lets the query finish before reproducing the list options
      
  }