const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.set("views", "./views");
app.set("view engine", "ejs");

const home = require("./routes/home");
app.use("/", home);

module.exports = app;