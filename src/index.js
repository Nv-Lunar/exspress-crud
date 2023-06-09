const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

app.get("/api", (req, res) => {
  res.send("Hello My Api");
});

const MakananController = require('./Makanan/Makanan.Controller')

app.use('/Makanan', MakananController)

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
