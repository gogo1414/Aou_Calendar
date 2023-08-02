"use strict";
// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector('#chat-messages');

// 사용자 입력 필드
const userInput = document.querySelector('#user-input input');

// 전송 버튼
const sendButton = document.querySelector('#user-input button');

// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = `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`;

// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

function addMessage(sender, message) {
    // 새로운 div 생성
    const messageElement = document.createElement('div');
    // 생성된 요소에 클래스 추가
    messageElement.className = 'message';
     // 채팅 메시지 목록에 새로운 메시지 추가
    messageElement.textContent = message;
    chatMessages.prepend(messageElement);
}

// ChatGPT API 요청
async function fetchAIResponse(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [
                // 메시지 역할을 user로 설정, 사용자가 입력한 메시지
                {role: "user", content: "8월 5일 6일 제주도 여행을 가는데 그 날짜를 피해서 8월 2일부터 8일까지 영어공부 일정좀 만들어줘."},
                {role: "system", content: "You can make the best schedule in the world and all the schedules you make are realistic, and almost everyone looks at your schedule and likes it."},
                {role: "assistant", content:
                `2023-08-02: 영어 단어 외우기
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
            stop: ["ㅇ"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };
    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
		console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}

// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', async () => {
    // 사용자가 입력한 메시지
    const message = userInput.value.trim();
    // 메시지가 비어있으면 리턴
    if (message.length === 0) return alert("메시지를 입력해주세요.");
    // 사용자 메시지 화면에 추가
    addMessage('나', message);
    userInput.value = '';
    //ChatGPT API 요청후 답변을 화면에 추가
    const aiResponse = await fetchAIResponse(message);
    console.log(aiResponse);
    addMessage('챗봇', aiResponse);
    // if(aiResponse) window.confirm("일정을 등록하시겠습니까?");
});

// 사용자 입력 필드에서 Enter 키 이벤트를 처리
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

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


const jsonArray = new Array();

// 특정 문자 기준으로 잘라 날짜와 일정 분리
let substrings = str.split(/[,,\n]/);
// 계획 날짜 갯수 
let cnt = str.split(',').length-1;


// 이벤트에 넣을 리스트 생성
for(let i=0; i < cnt*2;){
    var jsonObj = new Object();

    jsonObj.start = substrings[i++];
    jsonObj.title = substrings[i++];

    jsonObj = JSON.stringify(jsonObj);
    jsonArray.push(JSON.parse(jsonObj));
}