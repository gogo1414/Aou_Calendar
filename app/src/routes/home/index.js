"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get('/login', ctrl.output.login);
router.get('/calendar', ctrl.output.calendar);
router.get('/join', ctrl.output.join);
router.get('/logout', ctrl.output.logout);

router.post('/login', ctrl.process.login);
router.post('/join', ctrl.process.join);


module.exports = router;