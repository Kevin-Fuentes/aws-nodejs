const express = require("express");
const fs = require('fs');
const https = require('https');
const http = require('http');
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const { uuid } = require("./controllers");

const app = express();
const httpsServerOptions = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
}

app.use(helmet());
app.use(compression());
app.use(cors());

const serverHttp = http.createServer(app);
serverHttp.listen(process.env.HTTP_PORT, process.env.IP);

const serverHttps = https.createServer(httpsServerOptions, app);
serverHttps.listen(process.env.HTTPS_PORT, process.env.IP);

app.use((req, res, next) => {
  if (req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`);
})

app.use(express.static(__dirname + "/public"));

app.get("/api/get-uuid", uuid.generatePass);

app.get("*", (req, res) => {
  res.status(404).send("<h1>Error 404: Recurso no encontrado</h1>");
});
