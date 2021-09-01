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



let localStorageToDos = localStorage.getItem('localStorageToDos');
let tasks = [];

// new Intl.DateTimeFormat('de-DE').format(date);


// funcion del
const removeTask = (event) => {
    // const listItems = document.querySelectorAll('li.task').length;
    taskNumber.textContent = listItems.length;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] === event.target.parentNode.innerHTML) {
            tasks.splice(i, 1)
            i--
        }
    }
    // console.log(tasks)
    localStorage.setItem('localStorageToDos', JSON.stringify(tasks));
    event.target.parentNode.remove();


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

const addTask = (event) => {
    event.preventDefault()
    const titleTask = input.value;

    //not empty
    if (titleTask === "")
        return alert('Text is empty!');

    // ...
    const task = document.createElement('li');
    task.className = 'task';

    //JASON
    tasks.push(`${titleTask}<p>${date.value}</p><button>DEL</button>`)
    localStorage.setItem('localStorageToDos', JSON.stringify(tasks));

    task.innerHTML = titleTask + ":  " + "<p>" + date.value + "</p><button>DEL</button>";
    ul.appendChild(task);
    input.value = "";

    //number of task
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
}

//date-today
date.min = new Date().toISOString().split("T")[0];


//funcion save
const saveFileButton = (event, element) => {
    event.preventDefault();
    if (fileNameField.value === "")
        return alert('Text is empty!');
    const items = document.querySelectorAll('li.task');

    //not empty 
    let text = '';
    items.forEach(element => {
        text += element.textContent.substring(0, element.textContent.length - 3) + " \n";
    });
    var blob = new Blob([text], {
        type: "text/javascript",
    });
    saveAs(blob, document.querySelector('#inputFileNameToSave').value + '.txt');
}


form.addEventListener('submit', addTask)