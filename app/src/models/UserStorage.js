"use strict";

class UserStorage{
    static #users = {
        id: ["1234", "12345", "asdf"],
        psword: ["1234", "1234", "123456"],
        name: ["a", "b", "c"]
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        
        return newUsers;
    }
};

module.exports = UserStorage;