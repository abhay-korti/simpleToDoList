/*
1. Object Factory -> Classes for Tasks -> Attributes of Name, Due Date, Priority, Description and Under which project.
2. Accept user input through Forms and Modal and set it to the created Objects
3. Add Project Functionality
4. Display with modules
const task1 = new Task('Read Book', '17/11/2021', 'Read a new book', '5');
*/
import { addToTaskList, deleteProject, addToLocalStorage } from './Modules/LocalSave.js';
import { getFromLocalStorage } from './Modules/LocalSave.js';
import { switchActiveProject } from './Modules/LocalSave.js';
import { deleteTask } from './Modules/LocalSave.js';

function sideBarUpdate() {
    console.log(document.querySelector('sidebar') != null);
    if (document.querySelector('.sidebar') != null) {
        document.querySelector('.sidebar').remove()
    }

    const sideBarDiv = document.createElement('div');
    sideBarDiv.classList.add('sidebar');

    const sideBarContent = document.createElement('div');
    sideBarContent.classList.add('sidebar-content');

    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', switchActiveProject);

    sideBarContent.append(allBtn);

    let localArr = getFromLocalStorage();
    if (localArr.length > 0) {
        for (let i = 0; i < localArr.length; i++) {
            const projectBtnDiv = document.createElement('div');
            const projectBtn = document.createElement('button');
            projectBtn.textContent = localArr[i].name;
            projectBtn.addEventListener('click', switchActiveProject);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            deleteBtn.addEventListener('click', deleteProject);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';


            projectBtnDiv.append(projectBtn, editBtn, deleteBtn);
            sideBarContent.append(projectBtnDiv);
        }
    }

    sideBarDiv.append(sideBarContent);

    document.querySelector('.totalparent').insertBefore(sideBarDiv, document.querySelector('.inputdiv'));
}

const inputUI = (function inputUI() {

    const totalParent = document.createElement('div');
    totalParent.classList.add('totalparent');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputdiv');

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

    inputDiv.append(nameInput, dateInput, descInput, prioInput, projInput, initBtn, contentParent);
    totalParent.append(inputDiv);
    document.body.append(totalParent);
    sideBarUpdate();

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

export function displayProjects(toDisp = 'All') {

    console.log(toDisp);

    for (let i = 0; i < document.querySelector('.content-parent').children.length; i++) {
        inputUI.contentParent.removeChild(inputUI.contentParent.children[i]);
    }

    let projArr = getFromLocalStorage();
    let outerLooper, totalLength;
    if (toDisp == 'All') {
        outerLooper = 0;
        totalLength = projArr.length;
    }
    else {
        for (let i = 0; i < projArr.length; i++) {
            if (projArr[i].name == toDisp) {
                outerLooper = i;
                totalLength = i + 1;
            }
        }
    }

    const displayDiv = document.createElement('div');
    if (projArr.length > 0) {
        for (outerLooper; outerLooper < totalLength; outerLooper++) {
            const projNameDiv = document.createElement('div');
            projNameDiv.textContent = projArr[outerLooper].name;
            displayDiv.append(projNameDiv);
            for (let j = 0; j < projArr[outerLooper].tasks.length; j++) {
                const projTask = projArr[outerLooper].tasks[j];
                const projTaskDiv = document.createElement('div');
                projTaskDiv.classList.add('tasks');
                projTaskDiv.dataset.uid = projArr[outerLooper].tasks[j].uid;
                for (let keys in projTask) {
                    if (keys != 'project' && keys != 'uid') {
                        console.log(projTask[keys]);
                        projTaskDiv.textContent += `${keys}:${projTask[keys]} `;
                        displayDiv.append(projTaskDiv);
                    }
                }
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';

                deleteBtn.addEventListener('click', deleteTask);

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';

                editBtn.addEventListener('click', editTask);

                projTaskDiv.append(editBtn, deleteBtn);
            }
        }

    }
    else {
        displayDiv.textContent = 'Add Projects';
    }
    return displayDiv;
}
document.querySelector('.content-parent').append(displayProjects());

function test123() {
    if (inputUI.nameInput.value == "" || inputUI.dateInput.value == "" || inputUI.descInput.value == "" || inputUI.prioInput.value == "" || inputUI.projInput.value == "") {
        alert('Input all fields');
        return;
    }

    let projArr = getFromLocalStorage();

    for (let i = 0; i < projArr.length; i++) {
        if (inputUI.projInput == projArr[i].name) {
            alert('Project already exists');
        }
    }

    addToTaskList(inputUI.nameInput.value, inputUI.dateInput.value, inputUI.descInput.value, inputUI.prioInput.value, inputUI.projInput.value);
    document.querySelector('.content-parent').append(displayProjects());
    sideBarUpdate();

}

inputUI.initBtn.addEventListener('click', test123);


function editSaveFunc(nameV, dateV, descV, prioV, totalDiv) {
    let contentDiv = document.querySelector('.content-parent');
    let localArr = getFromLocalStorage();
    console.log(nameV, dateV, descV, prioV, totalDiv);

    let localProj;

    if (nameV == "" || dateV == "" || descV == "" || prioV == "") {
        alert('Input all fields');
        return;
    }
    for (let i = 0; i < localArr.length; i++) {
        for (let j = 0; j < localArr[i].tasks.length; j++) {
            if (localArr[i].tasks[j].uid == totalDiv.parentNode.dataset.uid) {
                localArr[i].tasks[j].name = nameV;
                localArr[i].tasks[j].dueDate = dateV;
                localArr[i].tasks[j].description = descV;
                localArr[i].tasks[j].priority = prioV;
                localProj = localArr[i].tasks[j].project;
                document.querySelector(`.tasks[data-uid="${localArr[i].tasks[j].uid}"]`).dataset.uid = localArr[i].tasks[j].uid;
                localArr[i].tasks[j].uid = nameV + dateV + descV + prioV + localProj;
                break;
            }
        }
    }
    console.log(localProj);
    let projObj = {};
    for (let i = 0; i < localArr.length; i++) {
        projObj[localArr[i].name] = localArr[i];
    }
    addToLocalStorage(projObj);
    contentDiv.append(displayProjects(localProj));
}

function editTask() {
    if (this.parentElement.textContent != "Edit Mode") {
        let localDiv;
        let localArr = getFromLocalStorage();
        let localName, localDate, localDesc, localPrio, localProj;
        for (let i = 0; i < localArr.length; i++) {
            for (let j = 0; j < localArr[i].tasks.length; j++) {
                if (localArr[i].tasks[j].uid == this.parentNode.dataset.uid) {
                    console.log(`${localArr[i].tasks[j].uid}`);
                    localName = localArr[i].tasks[j].name;
                    localDate = localArr[i].tasks[j].dueDate;
                    localDesc = localArr[i].tasks[j].description;
                    localPrio = localArr[i].tasks[j].priority;
                    localProj = localArr[i].tasks[j].project;
                    localDiv = document.querySelector(`.tasks[data-uid="${localArr[i].tasks[j].uid}"]`);
                }

            }
        }
        // this.parentNode.textContent = "";

        const editName = document.createElement('input');
        const editDate = document.createElement('input');
        const editDesc = document.createElement('input');
        const editPrio = document.createElement('input');
        const editSaveBtn = document.createElement('button');

        editName.type = 'text';
        editDate.type = 'date';
        editDesc.type = 'textarea';
        editPrio.type = 'number';
        editSaveBtn.textContent = 'Save Edit';


        editName.value = localName;
        editDate.value = localDate;
        editDesc.value = localDesc;
        editPrio.value = localPrio;

        editSaveBtn.addEventListener('click', function () {
            editSaveFunc(editName.value, editDate.value, editDesc.value, editPrio.value, this);
        })

        this.parentElement.textContent = "Edit Mode";
        localDiv.append(editName, editDate, editDesc, editPrio, editSaveBtn);
    }
    else {
        displayProjects();
    }
}


