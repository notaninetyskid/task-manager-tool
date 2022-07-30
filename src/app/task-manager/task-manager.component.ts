import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { taskService } from '../shared/task-service';
import { taskModal } from '../shared/task.modal';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  listInputs = new FormGroup({
    List: new FormControl(null, Validators.required)
  });
  Priority: string;
  editTask: taskModal;
  editMode: boolean = false;
  editedTaskIndex: number;
  constructor(private taskService: taskService) { }

  ngOnInit() {

    this.taskService.startedEditing.subscribe((data: number) => {
      this.editedTaskIndex = data;
      this.editMode = true;
      this.editTask = this.taskService.getTask(data);
      this.listInputs.setValue({
        List: this.editTask.task
      });
      this.Priority = this.editTask.priority;
    })
  }
  addTask() {
    const value = this.listInputs.value.List;
    const dataToBeSent: taskModal = { task: value, priority: this.Priority, date: new Date() };

    if (this.editMode == true) {
      const editItem = this.taskService.updateTask(this.editedTaskIndex, dataToBeSent);
      
      console.log(editItem)
    } else {
      value === null ? null : this.taskService.taskFetch(dataToBeSent);
      this.listInputs.reset();
      this.Priority = null;
      console.log('it is:' + dataToBeSent)
    }

  }

  setPriority(priority: string) {
    console.log(priority);
    this.Priority = priority;
  }
}
