const cryptojs = require("crypto-js");

const string = 'this is my password'

//1. 단순 해싱으로 비밀번호 해싱
let hashAlgorithm = cryptojs.createHash('sha512'); // sha512 암호 알고리즘 사용

//선택된 알고리즘으로 해싱
let hashing = hashAlgorithm.update(string);
      
//표시할 인코딩 설정. 
let hashedString = hashing.digest('base64');

console.log(hashedString);

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

// const jsonArray = new Array();


// let str = `2023-07-01, 롤 티어 그랜드마스터 달성을 위한 전략과 팁을 인터넷에서 조사
// 2023-07-02, 롤 티어 그랜드마스터 선수들의 게임 플레이를 분석하고 배울 점을 찾아내기
// 2023-07-03, 롤 티어 그랜드마스터를 달성한 유저들의 인터뷰 및 경험 공유 영상 시청
// 2023-07-04, 롤 티어 그랜드마스터를 위한 챔피언 및 룬 조합에 대한 정보 수집
// 2023-07-05, 롤 티어 그랜드마스터를 위한 각 챔피언의 플레이 스타일 파악 및 승률 확인
// 2023-07-06, 롤 티어 그랜드마스터에 도달하기 위한 효율적인 플레이 방법 학습
// 2023-07-07, 롤 티어 그랜드마스터에 도달한 선수들의 게임 녹화 영상 시청 및 분석
// 2023-07-08, 롤 티어 그랜드마스터 도전을 위한 팀원 모집 및 소통 방법 찾아보기
// 2023-07-09, 롤 티어 그랜드마스터에 도달한 유저들의 블로그나 포스트 읽어보기
// 2023-07-10, 롤 티어 그랜드마스터를 위한 효율적인 연습 방법과 시간 관리 방법 조사
// 2023-07-11, 롤 티어 그랜드마스터 도전을 위한 전략 논의를 위한 온라인 모임 참여
// 2023-07-12, 롤 티어 그랜드마스터를 위한 승률 추이와 롱론 분석 자료 조사
// 2023-07-13, 롤 티어 그랜드마스터를 달성한 선수들의 인터뷰와 플레이 스타일 비교
// 2023-07-14, 롤 티어 그랜드마스터에 도달하기 위한 팀원들과의 연습 일정 조율`

// // 특정 문자 기준으로 잘라 날짜와 일정 분리
// let substrings = str.split(/[,,\n]/);
// // 계획 날짜 갯수 
// let cnt = str.split(',').length-1;

// // 이벤트에 넣을 리스트 생성
// for(let i=0; i < cnt; i++){
//     var jsonObj = new Object();

//     jsonObj.start = substrings[i++];
//     jsonObj.title = substrings[i++];

//     jsonObj = JSON.stringify(jsonObj);
//     jsonArray.push(JSON.parse(jsonObj));
// }

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