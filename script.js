const btnAddTask = document.querySelector('button');
const taskName = document.querySelector('input');

let tasks = getTaskFromLocalStorage()
renderTask(tasks);

btnAddTask.addEventListener('click', function() {
    if(!taskName.value) {
        alert('Nhập công việc')
        return false
    }
    let tasks = getTaskFromLocalStorage()
    console.log(tasks);
    tasks.push({nameTask: taskName.value})
    taskName.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks);

})

function renderTask(tasks = []) {
    let listTask = '<ul>';
   
    tasks.forEach((task,index) => {
        listTask += `
        <li>
            <div class="task-name">${task.nameTask}</div>
            <a href="#">Edit</a>
            <a href="#" onClick="deleteTask(${index})">Delete</a>
        </li>`
    });
    listTask += '</ul>'
    document.querySelector('.task-item').innerHTML = listTask;

}
function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ?  JSON.parse(localStorage.getItem('tasks')) : []
}

function deleteTask(id) {
    if(confirm('Bạn có muốn xóa Task không?')) {
        let tasks = getTaskFromLocalStorage() ;
        console.log(tasks);
        tasks.splice(id,1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTask(getTaskFromLocalStorage());
    }
    

}