import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { taskModal } from "./task.modal";

@Injectable({providedIn: 'root'}) 



export class taskService {
    
    tasks =  new Subject<taskModal[]>();
    startedEditing = new Subject<number>();
    
    private taskList: taskModal[] = [
    
        new taskModal( 'brushing', 'High', new Date)
    ];

    tasksFetch() {
        return this.taskList.slice();
    };

    taskFetch(task: taskModal) {
        this.taskList.push(task)
        this.tasks.next(this.taskList.slice());
    }
    getTask(index:number) {
        return this.taskList[index]
    }
    updateTask(index: number, newTask: taskModal) {
        this.taskList[index] = newTask;
        this.tasks.next(this.taskList.slice());
    }
}