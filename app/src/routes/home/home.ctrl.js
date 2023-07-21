"use strict";

const output = {
    login: (req, res) => {
        res.render("home/index");
    },

    calendar: (req, res) => {
        res.render("home/calendar");
    },

    join: (req, res) => {
        res.render("home/join");
    },
};

const users = {
    id: ["1234", "12345", "asdf"],
    psword: ["1234", "1234", "123456"],
};

const process = {
    login: (req, res) => {
        const id = req.body.id;
        const psword = req.body.psword;
        
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword) {
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다.",
        });
    },
};

module.exports = {
    output,
    process,
};