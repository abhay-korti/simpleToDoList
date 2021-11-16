/*
1. Object Factory -> Classes for Tasks -> Attributes of Name, Due Date, Priority, Description and Under which project.
2. Accept user input through Forms and Modal and set it to the created Objects
3. Add Project Functionality
4. Display with modules
const task1 = new Task('Read Book', '17/11/2021', 'Read a new book', '5');
*/
import { addToTaskList } from './Modules/LocalSave.js';
import { getFromLocalStorage } from './Modules/LocalSave.js';

function sideBarUpdate() {
    if (document.querySelector('.sidebarcontent') != undefined) {
        for (let i = 0; i < document.querySelector('.sidebarcontent').children.length; i++) {
            console.log(document.querySelector('.sidebarcontent').children[i]);
            document.querySelector('.sidebarcontent').removeChild(document.querySelector('.sidebarcontent').children[i]);
        }
    }
    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('sidebar');

    const sideBarContent = document.createElement('div');
    sideBarContent.classList.add('sidebarcontent')

    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';

    sideBarContent.append(allBtn);
    sidebarDiv.append(sideBarContent);

    let projArr = getFromLocalStorage();
    if (projArr.length > 0) {
        for (let i = 0; i < projArr.length; i++) {
            const projectBtn = document.createElement('button');
            projectBtn.textContent = projArr[i].name;
            sideBarContent.append(projectBtn);
        }
    }
    document.body.append(sidebarDiv);
    // document.querySelector('.sidebar').parentNode.replaceChild(sidebarDiv, document.querySelector('.sidebar'))
}

const inputUI = (function inputUI() {

    sideBarUpdate();
    const totalParent = document.createElement('div');
    const inputDiv = document.createElement('div');

    const contentParent = document.createElement('div');
    contentParent.classList.add('content-parent');

    const initBtn = document.createElement('button');
    let nameInput = document.createElement('input');
    let dateInput = document.createElement('input');
    let descInput = document.createElement('input');
    let prioInput = document.createElement('input');
    let projInput = document.createElement('input');


    nameInput.type = 'text';
    dateInput.type = 'date';
    descInput.type = 'textarea';
    prioInput.type = 'number';
    projInput.type = 'text';
    projInput.value = 'default';


    return {
        totalParent,
        contentParent,
        inputDiv,
        initBtn,
        nameInput,
        dateInput,
        descInput,
        prioInput,
        projInput
    }
})();
inputUI.inputDiv.append(inputUI.nameInput, inputUI.dateInput, inputUI.descInput, inputUI.prioInput, inputUI.projInput, inputUI.initBtn, inputUI.contentParent);
inputUI.totalParent.append(inputUI.inputDiv);
document.body.append(inputUI.totalParent);


function displayProjects() {
    for (let i = 0; i < document.querySelector('.content-parent').children.length; i++) {
        inputUI.contentParent.removeChild(inputUI.contentParent.children[i]);
    }
    let projArr = getFromLocalStorage();
    const displayDiv = document.createElement('div');
    if (projArr.length > 0) {
        for (let i = 0; i < projArr.length; i++) {
            const projNameDiv = document.createElement('div');
            projNameDiv.textContent = projArr[i].name;
            displayDiv.append(projNameDiv);
            for (let j = 0; j < projArr[i].tasks.length; j++) {
                const projTask = projArr[i].tasks[j];
                const projTaskDiv = document.createElement('div');
                for (let keys in projTask) {
                    projTaskDiv.textContent += `${keys}:${projTask[keys]} `
                    displayDiv.append(projTaskDiv);
                }
            }

        }
        return displayDiv;
    }
};
document.querySelector('.content-parent').append(displayProjects());

function test123() {
    if (inputUI.nameInput.value == "" || inputUI.dateInput.value == "" || inputUI.descInput.value == "" || inputUI.prioInput.value == "" || inputUI.projInput.value == "") {
        alert('Input all fields');
        return;
    }
    addToTaskList(inputUI.nameInput.value, inputUI.dateInput.value, inputUI.descInput.value, inputUI.prioInput.value, inputUI.projInput.value);
    document.querySelector('.content-parent').append(displayProjects());
    sideBarUpdate();
}

inputUI.initBtn.addEventListener('click', test123)


