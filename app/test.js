// const cryptojs = require("crypto-js");

// const string = 'this is my password'

// //1. 단순 해싱으로 비밀번호 해싱
// let hashAlgorithm = cryptojs.createHash('sha512'); // sha512 암호 알고리즘 사용

// //선택된 알고리즘으로 해싱
// let hashing = hashAlgorithm.update(string);
      
// //표시할 인코딩 설정. 
// let hashedString = hashing.digest('base64');

// console.log(hashedString);

// // 암호화 처리하는데 시간 걸리니까 비동기로 처리
// const createSalt = () =>
//   new Promise((resolve, reject) => {
//       crypto.randomBytes(64, (err, buf) => {
//           if (err) reject(err);
//           resolve(buf.toString('base64'));
//       });
//   });

// const createHashedPassword = (plainPassword) =>
//   new Promise(async (resolve, reject) => {
//       const salt = await createSalt(); // 소금 만들어서 대입
//       crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
//           if (err) reject(err);
//           resolve({ password: key.toString('base64'), salt });
//       });
//   });

// async function play() {
//   const { password, salt } = await createHashedPassword("1234");
//   console.log(password, salt);
// }
// play()

// await models.user
//             .create({
//                 ...req.body.user,
//                 password,
//                 salt,
//             })

  // => 최종적으로 암호화된 비밀번호화 / 소금을 반환한다.
// 소금도 반환하는 이유는, 각 유저의 비밀번호 암호화하는데
//  사용된 소금 종류가 다르기 때문에, 각 유저마다 소금을 가지고있어야 비교가 가능하다.

msgText=
`2023-08-08: Grammar study
2023-08-09: Reading practice
2023-08-10: Writing practice
2023-08-11: Listening learning to improve English listening skills
2023-08-12: Grammar and vocabulary review`

if (true) {
  const jsonArray = [];

  // Separate date and schedule by splitting based on newline character
  let lines = msgText.split('\n');

  // Create a list to put in the event
  lines.forEach(line => {
    let [start, title] = line.split(': ');

    var jsonObj = {
      start: start,
      title: title
    };

    jsonArray.push(jsonObj);
  });

  console.log(jsonArray);
}

// <!DOCTYPE html>
// <html lang="ko">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Aou Callender</title>
//     <link href="/css/home/calendar.css" rel="stylesheet">
//     <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
//     <script>
//       document.addEventListener('DOMContentLoaded', function() {
//         var calendarEl = document.getElementById('calendar');
//         var calendar = new FullCalendar.Calendar(calendarEl, {
//           timeZone: 'UTC',
//           navLinks: true,
//           height: 700,
//           width: 800,
//           headerToolbar: {
//             left: 'prev next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//           },
//           initialView: 'dayGridMonth',
//           editable: true,
//           selectable: true,
//           eventBorderColor : '#82d1ff', // 이벤트 테두리색
// 			    eventBackgroundColor : '#82d1ff' , // 이벤트 배경색
//           eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
//             console.log(obj);
//           },
//           eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
//             console.log(obj);
//           },
//           eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
//             console.log(obj);
//           },
//           events: [],
//           select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
//             var events = new Array();
//             for(let j=0; j<cnt;j++){
//               events.push(jsonArray[j]);
//               console.log(jsonArray[j]);
//               console.log(j);    
//             };
//             var title = prompt('일정 추가:');
//             if (title) {
//               calendar.addEvent({
//                 title: title,
//                 start: arg.start,
//                 end: arg.end,
//                 allDay: arg.allDay
//               })
//             }
//             calendar.unselect();
//           },
//           eventClick: function(arg) { // 이벤트 클릭 후 삭제
//             console.log(arg);
//             if(confirm('일정을 삭제하시겠습니까?')){
//               arg.event.remove();
//             }
//           },
//           slotMinTime: '08:00', // Day 캘린더에서 시작 시간
//           slotMaxTime: '22:00', // Day 캘린더에서 종료 시간
//         });
//         calendar.render();
//       });
//     </script>
//   </head>
// <body>
//   <h1 class="title">Aou Calendar</h1>
//   <div id="calendar" class="rap"></div>

//   <div id="chat-container">
//     <div id="chat-messages"></div>
//     <div id="user-input">
//         <input type="text" placeholder="메시지를 입력하세요..." />
//         <button>전송</button>
//     </div>
//   </div> 
// <script src="/js/home/calendar.js"></script>
// </body>
// </html>