"use strict";

// 모듈
const express = require('express')
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./src/config/logger");
var cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const MySQLStore = require("express-mysql-session")(session);
dotenv.config();

const options = {
	host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    port: 3306
};

const sessionStore = new MySQLStore(options);

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true,
}

app.use(cors(corsOptions));
app.use(express.static('public'));

// 앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: "loginData",
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized:true,
    cookie: {
        expires: 60*60*24,
    },
    store: sessionStore,
    port: 3306
}));

// URL을 통해 전달되는 데이터에 한글, 공백 등과 
// 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan("tiny", { stream: logger.stream })); // log 관리

// 라우팅
const home = require("./src/routes/home");
app.use("/", home); // use 미들 웨어 등록 메소드

sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

module.exports = app;