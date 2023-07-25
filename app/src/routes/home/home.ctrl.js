"use strict";

const logger = require("../../config/logger");
const User = require("./../../models/User");

const output = {
    login: (req, res) => {
        logger.info(`Get /login 200 "로그인 화면으로 이동"`);
        res.render("home/index");
    },

    calendar: (req, res) => {
        logger.info(`Get /calendar 200 "메인 화면으로 이동"`);
        res.render("home/calendar");
    },

    join: (req, res) => {
        logger.info(`Get /join 200 "회원가입 화면으로 이동"`);
        res.render("home/join");
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.err)
            logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`);
        else
            logger.info(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
            );
        return res.json(response);
    },
    join: async (req, res) => {
        const user = new User(req.body);
        const response = await user.join();
        if(response.err)
            logger.error(`POST /join 200 Response: "success: ${response.success}, msg: ${response.err}"`);
        else
            logger.info(
                `POST /join 200 Response: "success: ${response.success}, msg: ${response.msg}"`
            );
        logger.info(
            `POST /join 200 Response: "success: ${response.success}, msg: ${response.msg}"`
        );
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};