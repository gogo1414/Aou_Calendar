// chatgpt로 일정 생성 후에 
// 데이터베이스에 저장하고 그 다음에 달력에 넣는 순서로 진행해야함
calendar = null;
initialLocaleCode = 'ko';
localeSelectorE1 = document.getElementById('loacle-selector');
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};

$(document).ready(function() {

  $.ajax({
    url: "/getEvents",
    method: "GET",
    dataType: "json",
    success:function(data){
      var events = data.map(function(item) {
        return {
          title: item.title,
          start: item.start,
          end: item.end
        };
      });

      calendar.addEventSource(events);
    },
    error: function(request, status, error) {
      alert("정신차려라: " + error);
    }
  })

  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'KOR',
    initialView: 'dayGridMonth',
    height: 700,
    width: 800,
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    navLinks: true,
    editable: true,
    selectable: true,
    
    eventAdd: function() {
      console.log();
    },

    select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      (async () => {
        const { value: title } = await Swal.fire({
          title: '일정을 입력',
          input: 'text',
          inputPlaceholder: '추가하고 싶은 일정을 입력하세요...'
        });

        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          });
        }

        var allEvent = calendar.getEvents(); // .getEvents() 함수로 모든 이벤트를 Array 형식으로 가져온다. (FullCalendar 기능 참조)

        var events = new Array(); // Json 데이터를 받기 위한 배열 선언
        for (var i = allEvent.length - 1; i < allEvent.length; i++) {
            var obj = new Object();     // Json 을 담기 위해 Object 선언
            start = new Intl.DateTimeFormat('ko-KO', options).format(allEvent[i]._instance.range.start);
            end = new Intl.DateTimeFormat('ko-KO', options).format(allEvent[i]._instance.range.end);
            obj.start = changeDate(start);
            obj.end = changeDate(end);
            obj.title = allEvent[i]._def.title; // 이벤트 명칭  ConsoleLog 로 확인 가능.
            obj.allday = allEvent[i]._def.allDay;
            events.push(obj);
        }
        console.log(events);
        var jsondata = JSON.stringify(events);

        $(function saveData(jsondata) {
          $.ajax({
              url: "/saveEvents",
              method: "POST",
              dataType: "json",
              data: JSON.stringify(events),
              contentType: 'application/json',
              success : function (data){
                console.log(data);
              },
          })
          .fail(function (request, status, error) {
            alert("에러 발생했다 정신차려라" + error);
          });
          calendar.unselect()
        })
      })();
    },

    eventClick: function(arg) { // 이벤트 클릭 후 삭제
      Swal.fire({
        title: '일정을 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) =>{
        if(result.isConfirmed) {
          arg.event.remove();
        }
      })

      var events = new Array();
      var obj = new Object();
      obj.title = arg.event._def.title;
      start = new Intl.DateTimeFormat('ko-KO', options).format(arg.event._instance.range.start);
      obj.start = changeDate(start);
      events.push(obj);

      $(function deleteData() {
        $.ajax({
          url: "/deleteEvents",
          method: "DELETE",
          dataType: "json",
          data: JSON.stringify(events),
          contentType: 'application/json',
        })
      })
    },

    slotMinTime: '08:00', // Day 캘린더에서 시작 시간
    slotMaxTime: '22:00', // Day 캘린더에서 종료 시간
    
    // events: function(info, successCallback, failureCallback) {
    //   if (!jsonArray2) return;

    //    eventsArr = new Array;

    //   jsonArray2.forEach(element => {
    //     eventsArr.push(element);
    //   });

    //   //calendar.refetchEvents()
    //   successCallback(eventsArr);
    // }
  });
  calendar.render();
});

function changeDate(inputDate) {
  const dateParts = inputDate.split('. ');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const time = dateParts[3];

  const [hour, minute] = time.split(':');

  const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

  return formattedDate;
}