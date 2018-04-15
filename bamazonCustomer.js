// dependecies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;

  // are we hooked up
  console.log("connected as id " + connection.threadId);
  showItems();
  connection.end();
});

// write the function to show all the items
function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    
    // create the table
    var table = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
    });
    res.forEach(element => {
      table.push(
        [element.item_id, element.product_name, element.department_name, "$"+element.price, element.stock_quantity]
      );
    });
    // display the table
    console.log(table.toString());
  });
}