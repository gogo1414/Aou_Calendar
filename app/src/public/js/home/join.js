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
    let reg = /^[A-Za-z0-9]{6,20}$/;
    if(!id.value) return alert("아이디를 입력해주십시오.");
    if(!id.value.match(reg)) return alert("아이디에 영문 숫자 조합 6자리 이상이 포함되도록 입력해주십시오.");
    if(!psword.value.match(reg)) return alert("비밀번호에 영문 숫자 조합 6자리 이상이 포함되도록 입력해주십시오.");
    if(psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");
    if(!name.value) return alert("이름을 입력해주십시오.");
    if(!year.value || !month.value || !day.value) return alert("생년월일을 입력해주십시오.");
    
    var birth = year.value.concat("-",month.value,"-",day.value);

    const req={
        id: id.value,
        name: name.value,
        psword: psword.value,
        birth: birth
    };
    fetch("/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            alert("회원가입이 정상적으로 완료되었습니다.");
            location.href = "/login";
        } else{
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) =>{ //라우터 연결 안될 때
        console.error(new Error("회원가입 중 오류 발생!"));
    });
}