"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/login', ctrl.output.login);
router.get('/calendar', ctrl.output.calendar);
router.get('/join', ctrl.output.join);

router.post('/login', ctrl.process.login);
router.post('/join', ctrl.process.join);
router.post('/calendar', ctrl.process.chat);


module.exports = router;