var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon_db'
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole, non-zero number.';
	}
}

function promptUserPurchase() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
	
		var item = input.item_id;
		var quantity = input.quantity;

        connection.query('SELECT * FROM products WHERE ?', {item_id: item}, function(err, res) {
			if (err) throw err;

			if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = res[0];

				if (quantity <= productData.stock_quantity) {
					
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
			
					connection.query(updateQueryStr, function(err, res) {
						if (err) throw err;
						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}
function displayInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log('Existing Inventory: ');
		console.log('..................\n');
		var inventory = '';
		for (var i = 0; i < res.length; i++) {
			inventory = '';
			inventory += 'Item ID: ' + res[i].item_id + '  //  ';
			inventory += 'Product Name: ' + res[i].product_name + '  //  ';
			inventory += 'Department: ' + res[i].department_name + '  //  ';
			inventory += 'Price: $' + res[i].price + '\n';
			console.log(inventory);
		}
	  	console.log("---------------------------------------------------------------------\n");
	  	promptUserPurchase();
	})
}

function startBamazon() {

	displayInventory();
}

startBamazon();