const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config("/src/.env");
const { uuid } = require("./controllers");

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.listen(process.env.HTTP_PORT, process.env.IP, () => {
  console.log("Conectado:", process.env.HTTP_PORT);
});

app.use(express.static(__dirname + "/public"));
app.get("/api/get-uuid", uuid.generatePass);
app.get("*", (req, res) => {
  res.status(404).send("<h1>Error 404: Recurso no encontrado</h1>");
});
