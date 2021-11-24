import Task from './Task.js';
import Project from './Project.js';
import { displayProjects } from '../index.js';

export function addToLocalStorage(totalObj) {
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
                    console.log(projObj);
                    addToLocalStorage(projObj);
                    return;

                }
            }
        }
    }
    proj1.tasks.push(task);
    projObj[proj1.name] = proj1;

    console.log(projObj);

    addToLocalStorage(projObj);
}


export function switchActiveProject() {

    let contentDiv = document.querySelector('.content-parent');

    // for (let i = 0; i < contentDiv.children.length - 1; i++) {
    //     contentDiv.removeChild(contentDiv.children[i]);
    // }

    if (this.textContent == 'All') {
        document.querySelector('.content-parent').append(displayProjects());
    }
    else {
        let localArr = getFromLocalStorage();
        for (let i = 0; i < localArr.length; i++) {
            if (this.textContent == localArr[i].name) {
                document.querySelector('.content-parent').append(displayProjects(`${this.textContent}`));;
                break;
            }
        }
    }
};


export function deleteTask() {
    let projArr = getFromLocalStorage();
    for (let i = 0; i < projArr.length; i++) {
        for (let j = 0; j < projArr[i].tasks.length; j++) {
            console.log(projArr[i].tasks[j].uid, this.parentNode.dataset.uid);
            if (projArr[i].tasks[j].uid == this.parentNode.dataset.uid) {
                projArr[i].tasks.splice(j, 1);
            }
        }
        let projObj = {};
        for (let i = 0; i < projArr.length; i++) {
            projObj[projArr[i].name] = projArr[i];
        }
        addToLocalStorage(projObj);
        this.parentNode.remove();
    }
}


export function deleteProject() {
    let projArr = getFromLocalStorage();
    console.log(this.parentNode.firstElementChild.textContent, projArr[0].name)
    for (let i = 0; i < projArr.length; i++) {
        if (this.parentNode.firstElementChild.textContent == projArr[i].name) {
            projArr.splice(i, 1);
        }
    }
    localStorage.clear();
    let projObj = {};
    for (let i = 0; i < projArr.length; i++) {
        projObj[projArr[i].name] = projArr[i];
    }
    this.parentNode.remove();
    addToLocalStorage(projObj);
    document.querySelector('.content-parent').append(displayProjects());
}