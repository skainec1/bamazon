var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"root",
	database:"bamazon_db"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

function displayInventory(){
	connection.query('SELECT * FROM Products', function(err, res){
		if(err){console.log(err)};
		console.log('..................\n');

		var inventory = '';
		for (var i = 0; i < res.length; i++) {
			inventory = '';
			inventory += 'Item ID: ' + res[i].item_id + '  //  ';
			inventory += 'Product Name: ' + res[i].product_name + '  //  ';
			inventory += 'Department: ' + res[i].department_name + '  //  ';
			inventory += 'Price: $' + res[i].price + ' // ';
            inventory += 'quantity: ' + res[i].stock_quantity + '/n';
			console.log(inventory);
		}

	  	console.log("---------------------------------------------------------------------\n");
		managerList();
	});
};

function managerList(){
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "Choose an option below to manage current inventory:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product", "View Low Inventory"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock Inventory':
				restockRequest();
				break;
			case 'Add New Product':
				addRequest();
				break;
			case 'Remove An Existing Product':
				removeRequest();
                break;		
            case 'View Low Inventory':
                lowInventory();
                break;
		}
	});
};

function restockRequest(){
	inquirer.prompt([
	{
		name:"ID",
		type:"input",
		message:"What is the item number of the item you would like to restock?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},
	]).then(function(answers){
		var quantityAdded = answers.Quantity;
		var IDOfProduct = answers.ID;
		restockInventory(IDOfProduct, quantityAdded);
	});
};

function restockInventory(id, quant){
	connection.query('SELECT * FROM Products WHERE item_id = '+id, function(err,res){
		if(err){console.log(err)};
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' +stock_quantity+ 'WHERE item_id =' +item_id);

		displayInventory();
	});
};

function addRequest(){
	inquirer.prompt([

	{
		name: "ID",
		type: "input",
		message: "Add ID Number"

	},	
	{
		name: "Name",
		type: "input",
		message: "What is name of product you would like to stock?"
	},
	{
		name:"Category",
		type:"input",
		message:"What is the department for product?"
	},
	{
		name:"Price",
		type:"input",
		message:"What is the price for item?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},

	]).then(function(answers){
		var id = answers.ID;
		var name = answers.Name;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
		buildNewItem(id,name,category,price,quantity); 
	});
  };

  function buildNewItem(id, name,category,price,quantity){
  	connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity +  ')');
  	displayInventory();
  };

  function removeRequest(){
  	inquirer.prompt([{
  		name:"ID",
  		type:"input",
  		message:"What is the number of the item you would like to remove?"
  	}]).then(function(answer){
  		var id = answer.ID;
  		removeInventory(id); 
  	});
  };
  function lowInventory() {
    //   console.log("hfgd");
    connection.query('SELECT * FROM Products', function(err, res){
		if(err){console.log(err)};
		console.log('..................\n');

        var inventory = '';
        var stock = res[i].stock_quantity;
		for (var i = 0; i < res.length; i++) {
            if (stock <= 3) {
            inventory = '';
			inventory += 'Item ID: ' + res[i].item_id + '  //  ';
			inventory += 'Product Name: ' + res[i].product_name + '  //  ';
			inventory += 'Department: ' + res[i].department_name + '  //  ';
			inventory += 'Price: $' + res[i].price + ' // ';
            inventory += 'quantity: ' + res[i].stock_quantity + '/n';
            console.log(inventory);
            managerList();

        } else {
            console.log("No low Inventory")
            displayInventory();
        }
		}

	  	console.log("---------------------------------------------------------------------\n");
		displayInventory();
  })};

  function removeInventory(id){
  	connection.query('DELETE FROM Products WHERE item_id = ' + id);
  	displayInventory();
  };

  displayInventory();