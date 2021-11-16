import Task from './Task.js';
import Project from './Project.js';


function addToLocalStorage(totalObj) {
    for (let keys in totalObj) {
        localStorage.setItem(keys, JSON.stringify(totalObj[keys]));
    }
}

export function getFromLocalStorage() {
    let localArr = [];
    for (let keys in localStorage) {
        if (localStorage.hasOwnProperty(keys)) {
            localArr.push(JSON.parse(localStorage.getItem(keys)))
        }
    }
    return localArr;
}

export function addToTaskList(nameValue, dateValue, descValue, prioValue, projValue) {
    console.log(nameValue, dateValue, descValue, prioValue, projValue);
    let projObj = {};
    let tempObj = {};

    let task = new Task(nameValue, dateValue, descValue, prioValue, projValue);
    let proj1 = new Project(projValue);

    if (localStorage.length > 0) {
        for (let keys in localStorage) {
            if (localStorage.hasOwnProperty(keys)) {
                if (keys == task.project) {
                    tempObj = JSON.parse(localStorage[keys]);
                    tempObj['tasks'].push(task)
                    projObj[proj1.name] = tempObj;
                    addToLocalStorage(projObj);
                    return;

                }
            }
        }
    }
    proj1.tasks.push(task);
    projObj[proj1.name] = proj1;
    addToLocalStorage(projObj);
}