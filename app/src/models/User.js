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

            const bytes = CryptoJS.AES.decrypt(user.psword, secretKey);
            const psword = bytes.toString(CryptoJS.enc.Utf8);

            if(user){
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
}

module.exports = User;