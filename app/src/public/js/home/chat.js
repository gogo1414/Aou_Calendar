const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
var jsonArray2 = [];

// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

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
            // 메시지 역할을 user로 설정, 사용자가 입력한 메시지
            {role: "user", content: "8월 5일 6일 제주도 여행을 가는데 그 날짜를 피해서 8월 2일부터 8일까지 영어공부 일정좀 만들어줘."},
            {role: "system", content: "You can create the best schedule in the world and every schedule you create is realistic and almost everyone sees your schedule and thinks it's feasible."},
            {role: "system", content: "You must answer all your answers in Korean and answer all questions asked to make a schedule in a certain format."},
            {role: "assistant", content:`2023-08-02: 영어 단어 외우기
2023-08-03: 일반 동사 적용법
2023-08-04: 강의 책 파트3 학습
2023-08-05: 제주도 여행 1일차
2023-08-06: 제주도 여행 2일차
2023-08-07: 강조 문법 학습
2023-08-08: 영어 단어 외우기
`},
            {role: "user", content: prompt}
        ],
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

  // const jsonArray = [];

  // // 날짜와 일정 분리
  // let lines = msgText.split('\n');

  // // 배열 만들기
  // lines.forEach(line => {
  //   let [start, title] = line.split(': ');

  //   var jsonObj = {
  //     start: start,
  //     title: title
  //   };

  //   jsonArray.push(jsonObj);
  // });
  // console.log(jsonArray);
  // jsonArray2.length = 0;
  // jsonArray2 = jsonArray
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
