import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from 'src/app/model';
import { TaskService } from '../task.service';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks: Task[];

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(title: string) {
    const task: Task = {title, done: false};
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
  }

}
