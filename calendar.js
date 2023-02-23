const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const btnAddEvents = document.querySelector(".add-event-btn");
const eventInput = document.querySelector("input");


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
console.log(tasks);
renderTask(tasks);
btnAddEvents.addEventListener('click', function() {
    if(!eventInput.value) {
        alert('Create Event Add Calendar')
        return false
    }
    let tasks = getTaskFromLocalStorage()
    console.log(tasks);
    tasks.push({name: eventInput.value})
    eventInput.value = '';
   
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks);

});
function renderTask(tasks = []) {
    let listTask = '';
    tasks.forEach((task,index) => {
        listTask += ` 
        <div class="event">
          <div class="title">
            <i class="fa fa-circle"></i>
            <h3 class="event-title">${task.name}</h3>   
            <a href="" onclick="doneTask(event)"> <i class=" fa fa-check-circle-o"></i> </a>
            <a href="" onclick="deleteTask(${index})"> <i class="fa fa-trash""></i> </a>
            
          </div>
          
        </div>`
    });
    if (listTask === "") {
      listTask = `
        <div class="no-event">
          <h3>No Events</h3>
        </div>`;
    }
    document.querySelector('.events').innerHTML = listTask;
}
function doneTask(event) {
  event.preventDefault();
  var parent = event.target.closest(".event");
  parent.classList.toggle("done");
  tasks[event].done = true;
  localStorage.setItem("tasksDone", JSON.stringify(tasks));
  

}
function deleteTask(id) {
  console.log(id);
  if(confirm('Bạn có muốn xóa không ') ) {
    let tasks = getTaskFromLocalStorage();
    tasks.splice(id,1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(getTaskFromLocalStorage());
  }
    

}
function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ?  JSON.parse(localStorage.getItem('tasks')) : []
}