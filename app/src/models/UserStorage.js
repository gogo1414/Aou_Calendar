"use strict";

// const fs = require("fs").promises;
const db = require("../config/db");

class UserStorage{
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) =>{
                if (err) reject(`${err}`);
                else resolve(data[0]);
             });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, psword, name) VALUES(?, ?, ?);";
            db.query(
                query,
                [userInfo.id, userInfo.psword, userInfo.name],
                (err) =>{
                if (err) reject(`${err}`);
                else resolve({success: true});
            });
            const query2 = "INSERT INTO userSchedule(id, start, end, title, allday) VALUES(?, ?, ?, ?, ?);";
            db.query(
                query2,
                [userInfo.id, userInfo.birth, userInfo.birth, "birthday", true],
                (err) =>{
                if (err) reject(`${err}`);
                else resolve({success: true});
            });
        });
    }

    static async saveSchedule(schedules) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO userSchedule(id, start, end, title, allday) VALUES(?, ?, ?, ?, ?);";

            schedules.forEach(schedule => {
                console.log(schedule);
                db.query(
                    query,
                    ["12345", schedule.start, schedule.end, schedule.title, schedule.allday],
                    (err) => {
                        if(err) reject(`${err}`);
                        else resolve({success: true});
                    });
            })
        });
    }

    static async deleteSchedule(schedules) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM userSchedule where (start, title) = (?, ?);";
            
            schedules.forEach(schedule => {
                db.query(
                    query,
                    [schedule.start, schedule.title], (err) => {
                        if(err) reject(`${err}`);
                        else resolve({success: true});
                    }
                )
            })
        });
    }
}

module.exports = UserStorage;