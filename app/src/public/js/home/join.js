"use strict";

const id = document.getElementById('id')
const name = document.getElementById('name');
const psword = document.getElementById('psword');
const confirmPsword = document.getElementById('confirm-psword');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const mail = document.getElementById('mail');
const joinBtn = document.querySelector("button");

joinBtn.addEventListener("click", join);

function join(){
    const req={
        id: id.value,
        name: name.value,
        psword: psword.value,
        confirmPsword: confirmPsword.value,
        joinBtn: joinBtn.value,
        year: year.value,
        month: month.value,
        day: day.value,
    };
    console.log(req);
    
    // fetch("/join", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(req),
    // }).then((res) => res.json())
    // .then((res) => {
    //     if(res.success) {
    //         location.href = "/calendar";
    //     } else{
    //         alert(res.msg);
    //     }
    // })
    // .catch((err) =>{ //라우터 연결 안될 때
    //     console.error(new Error("로그인 중 오류 발생!"));
    // });
}
