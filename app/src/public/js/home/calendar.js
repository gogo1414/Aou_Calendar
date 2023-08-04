const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

//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
//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
// ChatGPT API 요청
async function fetchAIResponse(prompt) {
  // API 요청에 사용할 옵션을 정의
  const requestOptions = {
      method: 'POST',
      // API 요청의 헤더를 설정
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo",  // 사용할 AI 모델
          messages: [
          {
              role: "user", // 메시지 역할을 user로 설정
              content: prompt // 사용자가 입력한 메시지
          }, ],
          temperature: 0.8, // 모델의 출력 다양성
          max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
          top_p: 1, // 토큰 샘플링 확률을 설정
          frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
          presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
          stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
      }),
  };
  // API 요청후 응답 처리
  try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();
      console.log(data);
      const aiResponse = data.choices[0].message.content;
      return aiResponse;
  } catch (error) {
  console.error('OpenAI API 호출 중 오류 발생:', error);
      return 'OpenAI API 호출 중 오류 발생';
  }
}

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://github.com/JiyunElizabethYang/Smarcle-Farm/blob/main/Ultron%20image.png?raw=true";
const PERSON_IMG = "https://github.com/JiyunElizabethYang/Smarcle-Farm/blob/main/%EB%8F%84%ED%86%A0%EB%A6%AC.jpg?raw=true";
const BOT_NAME = "ULTRON";
const PERSON_NAME = "ME";

msgerForm.addEventListener('click', async () => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  const aiResponse = await fetchAIResponse(msgText);
  botResponse(msgText);
});

async function botResponse(message) {
  //ChatGPT API 요청후 답변을 화면에 추가
  const aiResponse = await fetchAIResponse(message);
  const msgText = aiResponse;
  const delay = msgText.split(" ").length * 100;
  
  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  }, delay);
}

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const jsonArray = new Array();


let str = `2023-07-01, 롤 티어 그랜드마스터 달성을 위한 전략과 팁을 인터넷에서 조사
2023-07-02, 롤 티어 그랜드마스터 선수들의 게임 플레이를 분석하고 배울 점을 찾아내기
2023-07-03, 롤 티어 그랜드마스터를 달성한 유저들의 인터뷰 및 경험 공유 영상 시청
2023-07-04, 롤 티어 그랜드마스터를 위한 챔피언 및 룬 조합에 대한 정보 수집
2023-07-05, 롤 티어 그랜드마스터를 위한 각 챔피언의 플레이 스타일 파악 및 승률 확인
2023-07-06, 롤 티어 그랜드마스터에 도달하기 위한 효율적인 플레이 방법 학습
2023-07-07, 롤 티어 그랜드마스터에 도달한 선수들의 게임 녹화 영상 시청 및 분석
2023-07-08, 롤 티어 그랜드마스터 도전을 위한 팀원 모집 및 소통 방법 찾아보기
2023-07-09, 롤 티어 그랜드마스터에 도달한 유저들의 블로그나 포스트 읽어보기
2023-07-10, 롤 티어 그랜드마스터를 위한 효율적인 연습 방법과 시간 관리 방법 조사
2023-07-11, 롤 티어 그랜드마스터 도전을 위한 전략 논의를 위한 온라인 모임 참여
2023-07-12, 롤 티어 그랜드마스터를 위한 승률 추이와 롱론 분석 자료 조사
2023-07-13, 롤 티어 그랜드마스터를 달성한 선수들의 인터뷰와 플레이 스타일 비교
2023-07-14, 롤 티어 그랜드마스터에 도달하기 위한 팀원들과의 연습 일정 조율`

// 특정 문자 기준으로 잘라 날짜와 일정 분리
let substrings = str.split(/[,,\n]/);
// 계획 날짜 갯수 
let cnt = str.split(',').length-1;

// 이벤트에 넣을 리스트 생성
for(let i=0; i < cnt*2; i){
    var jsonObj = new Object();

    jsonObj.start = substrings[i++];
    jsonObj.title = substrings[i++];

    jsonObj = JSON.stringify(jsonObj);
    jsonArray.push(JSON.parse(jsonObj));
}

console.log(jsonArray)