"use strict";

const CryptoJS = require("crypto-js");
const UserStorage = require("./UserStorage");
const secretKey = process.env.secretKey;

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id);

            if(user){
                const bytes = CryptoJS.AES.decrypt(user.psword, secretKey);
                const psword = bytes.toString(CryptoJS.enc.Utf8);
                if(user.id === client.id && psword === client.psword){
                    
                    return {success: true, id: user.id, name: user.name};
                }
                return {success: false, msg:"비밀번호가 틀렸습니다."};
            }
            return {success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (err) {
            return {success: false, err};
        }
    }

    async join() {
        const client = this.body;

        const ciphertext = CryptoJS.AES.encrypt(client.psword, secretKey).toString();
        client.psword = ciphertext;
        
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "이미 존재하는 아이디입니다."};
        }
    }

    async saveSchedule() {
        const schedules = this.body;
        
        try {
            const response = await UserStorage.saveSchedule(schedules);
            return response;
        } catch (err) {
            return { success: false, msg: "저장에 실패했습니다.."};
        }
    }

    async deleteSchedule() {
        const schedule = this.body;

        try {
            const response = await UserStorage.deleteSchedule(schedule);
            return response;
        } catch (err) {
            return { success: false, msg : "삭제에 실패했습니다."};
        }
    }
}

module.exports = User;