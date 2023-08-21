"use strict";

const id = document.getElementById('id')
const psword = document.getElementById('psword');
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login(){
    if(!id.value) return alert("아이디를 입력해주십시오.");
    if(!psword.value) return alert("비밀번호를 입력해주십시오.");

    const req={
        id: id.value,
        psword: psword.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/calendar";
        } else{
            if(res.err) return alert(res.err);
            console.log(res.msg);
            alert(res.msg);
        }
    })
    .catch((err) =>{ //라우터 연결 안될 때
        console.error(new Error("로그인 중 오류 발생!"));
    });
}
