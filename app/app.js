"use strict";

// 모듈
const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.static('public'))

// 앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

// 라우팅
const home = require("./src/routes/home");
app.use("/", home); // use 미들 웨어 등록 메소드

module.exports = app;