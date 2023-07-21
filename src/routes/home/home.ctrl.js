"use strict";
const login = (req, res) => {
    res.render("home/index");
}

const calendar = (req, res) => {
    res.render("home/calendar");
}

const join = (req, res) => {
    res.render("home/join");
}

module.exports = {
    login,
    calendar,
    join,
};