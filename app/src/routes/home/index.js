"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/login', ctrl.output.login);
router.get('/calendar', ctrl.output.calendar);
router.get('/join', ctrl.output.join);

router.post('/login', ctrl.process.login);

module.exports = router;