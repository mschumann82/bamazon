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
                addInv();
                break;
            case "Add New Product":
                createProduct();
                break;
            
        }
            
          
        
        
        
      
      });
  }

  function prodDisplay() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log("ID#" + res[i].id + " " + res[i].product_name + " " + res[i].price + " " + res[i].stock_quantity);
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
          console.log("ID#" + res[i].id + " " + res[i].product_name + " " + res[i].stock_quantity);
        }
        console.log("-----------------------------------\n");
        //console.log("Hit any key to continue.\n");
      });
      two = setTimeout(function twoSeconds(){
       list();
      }, 2000); // lets the query finish before reproducing the list options
      
  }

  function createProduct() {
    inquirer
    .prompt([
      // Here we ask for new product details.
      {
        type: "input",
        message: "What is the name of the product you wish to add?\n",
        name: "product"
      },
      {
      type: "input",
      message: "What department is the product in?\n",
      name: "dept"
    },
    {
        type: "input",
        message: "What is the price of the product?\n",
        name: "price"
      },
      {
      type: "input",
      message: "How many units of the product are being added to the inventory?\n",
      name: "stock"
    },
     
    ])
      .then(function(inquirerResponse) {
        productName = inquirerResponse.product;
        prodDept = inquirerResponse.dept;
        prodPrice = inquirerResponse.price;
        prodStock = inquirerResponse.stock;
        connection.query("INSERT INTO products SET ?",
            {
              product_name: productName,
              department_name: prodDept,
              price: prodPrice,
              stock_quantity: prodStock 
            },
            function(err, res) {
              console.log(res.affectedRows + " product added.\n");
              // Call updateProduct AFTER the INSERT completes
              
            }
          );   
          two = setTimeout(function twoSeconds(){
            list();
           }, 2000);  
        
      
      });
    
  
    
  }

  function addInv() {
    inquirer
    .prompt([
      // Here we ask for new product details.
      {
        type: "input",
        message: "What is the id# of the product you are restocking?\n",
        name: "id"
      },
      {
      type: "input",
      message: "What quantity being added to the product inventory?\n",
      name: "stock"
      },
    ])
    .then(function(inquirerResponse) {
      productID = inquirerResponse.id;
      prodQuantity = inquirerResponse.stock;
      added(productID, prodQuantity);
    });
  }

  function added(productID, prodQuantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?",
    [
        
          prodQuantity
        ,
        
          productID
        
      ],
    function(err, res) {
        
      console.log(res.affectedRows + " Your inventory has been updated");
      two = setTimeout(function twoSeconds(){
        list();
       }, 2000); 
    });
  }