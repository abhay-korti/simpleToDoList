export default class Task {
    constructor(name, dueDate, description, priority, project = 'default') {
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.uid = this.name + this.dueDate + this.description.length + this.priority + this.project;
    }

    set setName(name) {
        this.name = name;
    }

    set setDesc(desc) {
        this.description = desc;
    }

    set setDueDate(date) {
        this.dueDate = date;
    }

    set setPriority(prio) {
        this.priority = prio;
    }

    set setProject(project) {
        this.project = project;
    }

    get getName() {
        return this.name;
    }
    get getDesc() {
        return this.description;
    }
    get getDueDate() {
        return this.dueDate;
    }
    get getPriority() {
        return this.priority;
    }

    get getProject() {
        return this.project;
    }

}