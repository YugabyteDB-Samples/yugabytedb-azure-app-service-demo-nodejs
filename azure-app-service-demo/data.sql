TRUNCATE TABLE inventory;

TRUNCATE TABLE shoe_sales;

TRUNCATE TABLE shoes;

INSERT INTO
    shoes(brand, model, size, color, price)
VALUES
    ('hoka one one', 'speedgoat 5', 10, 'orange', 165),
    ('hoka one one', 'torrent 2', 10, 'blue', 145),
    ('nike', 'vaporfly 3', 10, 'white', 260),
    ('adidas', 'adizero adios pro 3', 10, 'red', 165);

INSERT INTO
    inventory (shoe_id, quantity)
VALUES
    (1, 25),
    (2, 15),
    (3, 100),
    (4, 75);

INSERT INTO
    shoe_sales (shoe_id, quantity, total_price)
VALUES
    (1, 1, 165);
INSERT INTO
    shoe_sales (shoe_id, quantity, total_price)
VALUES
    (2, 2, 290);
INSERT INTO
    shoe_sales (shoe_id, quantity, total_price)
VALUES
    (3, 1, 260);
INSERT INTO
    shoe_sales (shoe_id, quantity, total_price)
VALUES
    (4, 1, 165);