const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const btnAddEvents = document.querySelector(".add-event-btn");
const eventName = document.querySelector(".event-input");


let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const eventsArr = [];
console.log(eventsArr);
//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;
  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      days += `<div class="day event">${i}</div>`;
    } 
    else {
        days += `<div class="day ">${i}</div>`;
      }
    }
    for(let j = 1; j <= nextDays; j++) {
      days += `<div class = "day next-date">${j}</div>`
    }
  daysContainer.innerHTML = days;
}

initCalendar();


let tasks = getTaskFromLocalStorage()
renderTask(tasks);
btnAddEvents.addEventListener('click', function() {
    if(!eventName.value) {
        alert('Nhập công việc')
        return false
    }
    let tasks = getTaskFromLocalStorage()
    console.log(tasks);
    tasks.push({nameTask: eventName.value})
    eventName.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks);

})

function renderTask(tasks = []) {
    let listTask = '';
    tasks.forEach((task) => {
        listTask += ` 
        <div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${task.nameTask}</h3>
          </div>
        </div>`;
    });
    if (listTask === "") {
      listTask = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    document.querySelector('.events').innerHTML = listTask;
}
function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ?  JSON.parse(localStorage.getItem('tasks')) : []
}