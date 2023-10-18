require("dotenv").config();
const express = require("express");
var cors = require("cors");
const { Pool } = require("@yugabytedb/pg");
const { NODE_ENV, DB_CERTIFICATE, DB_HOST, DB_PASSWORD, DB_USERNAME } =
  process.env;
const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: "yugabyte",
  password: DB_PASSWORD,
  port: 5433,
  max: 10,
  idleTimeoutMillis: 0,
  ssl: {
    rejectUnauthorized: true,
    ca: atob(DB_CERTIFICATE),
    servername: DB_HOST,
  },
});
const App = express();

if (NODE_ENV !== "production") App.use(cors());

App.get("/api/inventory", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT i.quantity, i.id, s.model, s.brand from inventory i INNER JOIN shoes s on i.shoe_id = s.id;"
    );
    res.json(response?.rows);
  } catch (e) {
    console.log(`Error in /api/inventory: ${e}`);
    res.send(`application error: ${e}`);
  }
});

App.get("/api/sales", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT sa.quantity, sa.total_price, sa.sale_date, sa.id, s.model, s.brand from shoe_sales sa INNER JOIN shoes s on sa.shoe_id = s.id ORDER BY sa.sale_date ASC;"
    );
    res.json(response?.rows);
  } catch (e) {
    console.log(`Error in /api/sales: ${e}`);
    res.send(`application error: ${e}`);
  }
});

App.use(express.static("client/dist"));

App.listen(8080, () => {
  console.log("Running Brett's Node.js Application");
});
