DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('test1', 'home & garden', 20, 40),
('test2', 'auto', 5, 1),
('test3', 'misc', 10, 12),
('test4', 'tech', 20, 13),
('test5', 'books', 100, 25),
('test6', 'music', 250, 30),
('test7', 'clothing', 2, 2),
('test8', 'misc', 14, 25),
('test9', 'tech', 10, 300),
('test10', 'clothing', 4, 80);