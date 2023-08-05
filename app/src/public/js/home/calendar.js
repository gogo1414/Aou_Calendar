$(document).ready(function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'KOR',
    navLinks: true,
    height: 700,
    width: 800,
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    BorderColor : "#82d1ff", // 이벤트 테두리색
    BackgroundColor : "#82d1ff" , // 이벤트 배경색
    eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
      console.log(obj);
    },
    eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
      console.log(obj);
    },
    eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
      console.log(obj);
    },  
    select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      var title = prompt('일정 추가:');
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        })
      }
      calendar.unselect()
    },
    eventClick: function(arg) { // 이벤트 클릭 후 삭제
      console.log(arg);
      if(confirm('일정을 삭제하시겠습니까?')){
        arg.event.remove();
      }
    },
    slotMinTime: '08:00', // Day 캘린더에서 시작 시간
    slotMaxTime: '22:00', // Day 캘린더에서 종료 시간
    
    // events: function(info, successCallback, failureCallback) {
    //   let eventsArr = [];
    //   if (!jsonArray2) return;

    //   jsonArray2.forEach(element => {
    //     eventsArr.push(element);
    //   });

    //   //calendar.refetchEvents()
    //   successCallback(eventsArr);
    // }
  });
  calendar.render();
}) ;