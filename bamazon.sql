-- Drops the bamazon_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called bamazon_db --
CREATE DATABASE bamazon_db;



CREATE TABLE products(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
item_id INTEGER(9) NOT NULL AUTO_INCREMENT NOT NULL,
  -- Create a string column called "language" --
product_name VARCHAR(30) NOT NULL,
  -- Create an integer column called "rating" --
department_name VARCHAR(30) NOT NULL,
  -- Create a boolean column called "mastered" which will automatically fill --
price DECIMAL(6, 2),
  -- with true when a new row is made and the value isn't otherwise defined. --
stock_quantity INTEGER(30),
  -- Set the id as this table's primary key
  PRIMARY KEY (id)
);

-- Create new example rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Fender Stratocaster Fiesta Red', 'Guitars', 1199.99, 6),
		('Fender Stratocaster Daphne Blue', 'Guitars', 1199.99, 4),
		('Elixir .010 nanoweb electric', 'Guitars', 14.99, 172),
		('Friedman Runt-20 combo', 'Guitars', 1499.99, 3),
		('Vic Firth 5a hickory', 'Drums', 8.99, 200),
		('Roland FA-06', 'ProAudio', 1299.99, 2),
		('Line 6 L2T', 'ProAudio', 799.99, 7),
		('Shure sm57', 'ProAudio', 99.99, 80),
		('Ludwig Black Beauty 14', 'Drums', 699.99, 1),
		('Epiphone Thunderbird 4', 'Guitars', 399.99, 7),
		('Ampeg BA-210', 'Guitars', 599.99, 3);
