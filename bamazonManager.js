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
          addInventory();
          break;

        case 'Add New Product':
          addProduct();
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
  });
}

function viewLowInventory() {
  console.log('\n===============================================\n');

  connection.query('SELECT * FROM products', function(err, res) {
    // create the table
    var lowInventory = new Table({
      head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
    });
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
  });
}

function addInventory() {
  viewLowInventory();

  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'whatID',
          type: 'input',
          message: "what is the ID of the item you'd like to add quantity for?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: 'howMany',
          type: 'input',
          message: 'how many units do you want to add',
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var updateItem;
        res.forEach(element => {
          if (element.item_id === parseInt(answer.whatID)) {
            updateItem = element;
          }
        });
        var updatedStock =
          parseInt(updateItem.stock_quantity) + parseInt(answer.howMany);

        var updatedStock = connection.query(
          'UPDATE products SET ? WHERE ?',
          [
            {
              stock_quantity: updatedStock
            },
            {
              item_id: updateItem.item_id
            }
          ],
          function(err, res) {
            console.log('\n!!!!!!!!!!!!STOCK UPDATED!!!!!!!!!!!!');
            viewProducts();
          }
        );
      });
  });
}

function addProduct() {
  console.log("=====================================\n");
  console.log("GOTTA WRITE");
  console.log("\n=====================================");
  
}

function runAgain() {
  inquirer
    .prompt([
      {
        name: 'runAgain',
        type: 'confirm',
        message: 'Would you like to run again?',
        default: true
      }
    ])
    .then(answers => {
      if (answers.runAgain) {
        manageShit();
      } else {
        connection.end();
      }
    });
}
