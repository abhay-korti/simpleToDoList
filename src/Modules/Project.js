export default class Project {
    constructor(name = 'default') {
        this.name = name;
        this.tasks = [];
    }

    get getName() {
        return this.name;
    }

    get getTasks() {
        return this.tasks
    }

    set setName(name) {
        this.name = name;
    }

    set setTasks(tasks) {
        this.tasks = tasks;
    }
}