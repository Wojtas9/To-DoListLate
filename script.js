const form = document.querySelector('form');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector('h2 span');
const liElements = document.querySelectorAll('li');
const input = document.querySelector('input');
const date = document.querySelector('#date');
const toDoList = document.querySelector('.toDoList');
const clearBtn = document.querySelector('#clearBtn');
const fileNameField = document.querySelector('#inputFileNameToSave');
const listItems = document.querySelectorAll('li.task').length;
const items = document.querySelectorAll('li.task');

document.getElementById('date').value = new Date().toISOString().slice(0, 10);


let localStorageToDos = localStorage.getItem('localStorageToDos');
let tasks = [];

// funcion del
const removeTask = (event) => {


    taskNumber.textContent = listItems.length;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] === event.target.parentNode.innerHTML) {
            tasks.splice(i, 1)
            i--
        }
    }
    localStorage.setItem('localStorageToDos', JSON.stringify(tasks));
    event.target.parentNode.remove();

    var paraArr = [].slice.call(items).sort(function (a, b) {
        return a.textContent > b.textContent ? 1 : -1;
    });
    paraArr.forEach((p) => {
        toDoList.appendChild(p);
    });


}

const addTasks = () => {
    tasks = JSON.parse(localStorageToDos)
    tasks.forEach(task => {
        let storedTask = document.createElement('li');
        storedTask.className = 'task';
        storedTask.innerHTML = task;
        ul.appendChild(storedTask);
    })
    ul.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', removeTask);
    })
}
if (localStorageToDos !== '' && localStorageToDos !== null) {
    addTasks();
}

// after click Remove all
const removeAll = (event) => {
    event.preventDefault()
    const titleAll = input.value;
    Array.from(toDoList.children).forEach(element => {
        element.removeEventListener('click', removeAll)
        element.remove();
    })
    localStorage.clear();


}
clearBtn.addEventListener('click', removeAll)

//date new Format
const addTask = (event) => {
    event.preventDefault()
    const titleTask = input.value;

    if (date.value === "")
        return alert('Date is empty!');

    let dateFormat = new Date(date.value);
    dateFormat = new Intl.DateTimeFormat('de-DE').format(dateFormat);

    //not empty
    if (titleTask === "")
        return alert('Text is empty!');

    // ...
    const task = document.createElement('li');
    task.className = 'task';
    task.innerHTML = `<div class="text">${titleTask}</div><p>${dateFormat}</p><button>DEL</button>`;

    //JASON
    tasks.push(task.innerHTML)
    localStorage.setItem('localStorageToDos', JSON.stringify(tasks));
    ul.appendChild(task);
    input.value = "";

    //Number of task
    const listItems = document.querySelectorAll('li.task').length;
    const items = document.querySelectorAll('li.task');
    taskNumber.textContent = listItems;

    //after click DEL
    task.querySelector('button').addEventListener('click', removeTask);

    //sorted array
    var paraArr = [].slice.call(items).sort(function (a, b) {
        return a.textContent > b.textContent ? 1 : -1;
    });
    paraArr.forEach((p) => {
        toDoList.appendChild(p);
    });

    // localStorage.setItem("array", JSON.stringify(toDoList)); //store 
    // var storedArray = JSON.parse(localStorage.getItem("array"));
}

//date-today
date.min = new Date().toISOString().split("T")[0];


//funcion save
const saveFileButton = (event, element) => {
    event.preventDefault();
    if (fileNameField.value === "")
        return alert('Text is empty!');



    const items = document.querySelectorAll('li.task');
    let text = '';
    items.forEach((element, key) => {

        text += (key + 1) + ". " + document.querySelectorAll('li.task > div')[key].innerHTML + " " + document.querySelectorAll('li.task>p')[key].textContent + "." + " \n";
    });
    var blob = new Blob([text], {
        type: "text/javascript",
    });
    saveAs(blob, document.querySelector('#inputFileNameToSave').value + '.txt');
}


form.addEventListener('submit', addTask)