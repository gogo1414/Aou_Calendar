"use strict";

const logger = require("../../config/logger");
const User = require("./../../models/User");
const db = require("../../config/db");

const output = {
    login: (req, res) => {
        logger.info(`Get /login 200 "로그인 화면으로 이동"`);
        res.render("home/index");
    },

    calendar: (req, res) => {
        if(authStatus(req, res)){
            logger.info(`Get /calendar 200 "메인 화면으로 이동"`);
            res.render("home/calendar");
        } else {
            logger.info(`Get /login 200 "로그인 화면으로 이동"`);
            res.redirect("/login");
        }
    },

    join: (req, res) => {
        logger.info(`Get /join 200 "회원가입 화면으로 이동"`);
        res.render("home/join");
    },

    logout: (req,res) =>{
        req.session.destroy((err) => {
            if(err){
                console.log("세션 삭제에 오류 존재");
                return;
            }
            logger.info('Get /logout 200 "로그아웃 중입니다."');
            res.redirect("/login");
        })
    },

    getEvents: (req, res) => {
        const query = 'SELECT * FROM userSchedule'
        db.query(query, (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: '데이터베이스 오류'});
            }
            res.json(results);
        });
    }
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        if(response.success){
            if(req.session.is_logined){
                console.log("이미 로그인 상태입니다.");
            } else {
                req.session.is_logined = true;
                req.session.user_id = response.id;
                req.session.save((err) => {
                    if(err) {
                        console.log("세션 저장에 오류 발생");
                        return;
                    }
                })
            }
        }
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

    saveEvents: async (req, res) => {
        const user = new User(req.body);
        const response = await user.saveSchedule();

        const url = {
            method: "POST",
            path: "/saveEvents",
            status: response.err ? 400: 201,
        };
        log(response, url);
        return res.status(url.status).json(response);
    }
};

const remove = {
    deleteEvents: async (req, res) => {
        const user = new User(req.body);
        const response = await user.deleteSchedule();

        const url = {
            method: "DELETE",
            path: "/deleteEvents",
            status: response.err ? 400: 201,
        };
        log(response, url);
        return res.status(url.status).json(response);
    }
};

module.exports = {
    output,
    process,
    remove,
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

function authStatus(req, res) {
    if(req.session.is_logined) {
        return true;
    } else {
        return false;
    }
}