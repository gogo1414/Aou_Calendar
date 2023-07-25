"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
});

db.connect();

module.exports = db;