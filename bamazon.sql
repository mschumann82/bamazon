DROP DATABASE IF EXISTS bamazondb;
CREATE database bamazondb;

USE bamazondb;

CREATE TABLE products (
  position INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (position)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Golf Clubs", "Sporting Goods", 500, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Golf Balls", "Sporting Goods", 20, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Golf Bag", "Sporting Goods", 50, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Cast Iron Skillet", "Home Goods", 100, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Oven Mit", "Home Goods", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Baking Sheet", "Home Goods", 20, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Engine Oil", "Automotive", 10, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Engine Coolant", "Automotive", 20, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Engine Battery", "Automotive", 150, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Laptop Computer", "Electronics", 700, 3);

SELECT * FROM products;