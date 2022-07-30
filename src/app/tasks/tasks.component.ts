import { Component, OnInit } from '@angular/core';
import { taskService } from '../shared/task-service';
import { taskModal } from '../shared/task.modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: taskService) { }

  toDoList: taskModal[] = [];
  listIsEmpty: boolean = true;
  
  ngOnInit() {
  
    // this.toDoList = this.taskService.tasksFetch();

    this.taskService.tasks.subscribe((data) => {      
      this.toDoList = data;
      this.toDoList == [] ? this.listIsEmpty = true: this.listIsEmpty = false;
      console.log(data);
    });
  }
  removeTask(index: number) {
    this.toDoList.splice(index, 1)
  }
  updateItem(index: number) {
    this.taskService.startedEditing.next(index);
    console.log(index)
  }
}
