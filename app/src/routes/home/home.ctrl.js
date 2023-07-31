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

        // http 상태코드 중요하다고 합니다!
        // 200, 300, 400, 500 각각 다 다르지만 그냥 400과 200을 사용
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    join: async (req, res) => {
        const user = new User(req.body);
        const response = await user.join();
        
        const url = {
            method: "POST",
            path: "/join",
            status: response.err ? 400 : 201, // err가 어떤 err인지를 알아야 에러코드 반환을 정확하게 할 수 있음.
        };

        log(response, url);
        return res.status(url.status).json(response);
    },

    chat: async (req, res) => {
        const user = new User(req.body);
        const response = await user.chat();
        
        const url = {
            method: "POST",
            path: "/calendar",
            status: response.err ? 400 : 201, // err가 어떤 err인지를 알아야 에러코드 반환을 정확하게 할 수 있음.
        };

        log(response, url);
        return res.status(url.status).json(response);
    },
};

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if(response.err) {
            logger.error(`${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`);
    }   else {
        logger.info(
            `${url.method} ${url.path} ${url. status} Response: ${response.success} ${response.msg || ""}`
        );
    }
}