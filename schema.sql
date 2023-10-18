DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS shoe_sales;
DROP TABLE IF EXISTS shoes;

CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    size DECIMAL(3, 1) NOT NULL,
    color VARCHAR(50),
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE shoe_sales (
    id SERIAL PRIMARY KEY,
    shoe_id INT REFERENCES shoes(id),
    sale_date TIMESTAMP NOT NULL default current_timestamp,
    quantity INT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    shoe_id INT REFERENCES shoes(id),
    quantity INT NOT NULL
);

-- Create a trigger function to update inventory
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    -- Decrease the inventory quantity when a sale is made
    UPDATE inventory
    SET quantity = quantity - NEW.quantity
    WHERE shoe_id = NEW.shoe_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires after inserting a new sale
CREATE TRIGGER after_sale_insert
AFTER
INSERT
    ON shoe_sales FOR EACH ROW EXECUTE FUNCTION update_inventory();