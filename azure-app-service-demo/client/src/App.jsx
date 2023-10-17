import { useEffect, useState } from "react";
import "./App.css";
import { PieChart } from "@mui/x-charts/PieChart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AppBar } from "@mui/material";
import RunCircleIcon from "@mui/icons-material/RunCircle";

function App() {
  const [inventoryData, setInventoryData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  useEffect(() => {
    async function getShoes() {
      try {
        const inventoryURL =
          process.env.NODE_ENV === "development"
            ? "http://localhost:8080/api/inventory"
            : "/api/inventory";

        const salesURL =
          process.env.NODE_ENV === "development"
            ? "http://localhost:8080/api/sales"
            : "/api/sales";

        const inventoryRes = await fetch(inventoryURL);
        const inventoryJson = await inventoryRes.json();
        setInventoryData(inventoryJson);

        const salesRes = await fetch(salesURL);
        const salesJson = await salesRes.json();
        setSalesData(salesJson);
        console.log(`API response: ${res}`);
      } catch (e) {
        console.log(`Error in /api/: ${e}`);
      }
    }

    getShoes();
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          padding: "10px",
          alignItems: "middle",
        }}
      >
        <Typography variant="h5">YB Running Shoes</Typography>
        <span className="logo">
          <RunCircleIcon style={{ verticalAlign: "middle" }} />
        </span>
      </AppBar>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <div
          style={{
            width: "1000px",
          }}
        >
          <Typography
            sx={{ margin: "10px", fontWeight: "bold" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Shoe Inventory
          </Typography>
          <PieChart
            legend={{
              position: {
                horizontal: "middle",
                vertical: "bottom",
              },
            }}
            sx={{
              "--ChartsLegend-itemWidth": "250px",
              "--ChartsLegend-itemMarkSize": "20px",
              "--ChartsLegend-rootSpacing": "5px",
              "--ChartsLegend-labelSpacing": "5px",
              "--ChartsLegend-rootOffsetY": "-20px",
            }}
            series={[
              {
                data: inventoryData.map((d) => {
                  d.id = d.shoe_id;
                  d.value = d.quantity;
                  d.label = `${d.brand} ${d.model}`;
                  return d;
                }),
                outerRadius: 160,
                cy: 160,
              },
            ]}
            width={1200}
            height={400}
          />
        </div>
        <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
          <Typography
            sx={{ margin: "10px", fontWeight: "bold" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Recent Shoe Sales
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell align="right">Model</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.brand}
                  </TableCell>
                  <TableCell align="right">{row.model}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.total_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default App;
