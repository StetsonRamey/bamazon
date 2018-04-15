// dependecies
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon_DB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to: ' + connection.config.database);

  manageShit();
});

function manageShit() {
  var choices = [
    'View Products for Sale',
    'View Low Inventory',
    'Add to Inventory',
    'Add New Product'
  ];

  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'Options',
      choices: choices
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'View Products for Sale':
          viewProducts();
          break;

        case 'View Low Inventory':
          viewLowInventory();
          break;

        case 'Add to Inventory':
          break;

        case 'Add New Product':
          break;
      }
    });
}

function viewProducts() {
  console.log('\n===============================================\n');

  connection.query('SELECT * FROM products', function(err, res) {
    // create the table
    var table = new Table({
      head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
    });
    res.forEach(element => {
      table.push([
        element.item_id,
        element.product_name,
        element.department_name,
        '$' + element.price,
        element.stock_quantity
      ]);
    });
    // display the table
    console.log(table.toString());
    console.log('\n===============================================\n');

    manageShit();
  });
}

function viewLowInventory() {
  console.log('\n===============================================\n');

  connection.query('SELECT * FROM products', function(err, res) {
    // create the table
    var lowInventory = new Table({
      head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
    });
    // console.log(res);
    // console.log(res.stock_quantity);

    res.forEach(element => {
      if (element.stock_quantity < 5) {
        lowInventory.push([
          element.item_id,
          element.product_name,
          element.department_name,
          '$' + element.price,
          element.stock_quantity
        ]);
      }
    });

    // display the table
    console.log(lowInventory.toString());
    console.log('\n===============================================\n');
    manageShit();
  });
}
