"use strict";

// 모듈
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.static('public'))

// 앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 
// 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));

// 라우팅
const home = require("./src/routes/home");
app.use("/", home); // use 미들 웨어 등록 메소드

module.exports = app;