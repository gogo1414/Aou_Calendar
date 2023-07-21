"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/login', ctrl.login);
router.get('/calendar', ctrl.calendar);
router.get('/join', ctrl.join);

module.exports = router;