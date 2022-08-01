import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task, TaskListFilterType } from 'src/app/model';
import { TaskService } from '../task.service';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  filteredTasks: Task[];
  taskFilterTypes: TaskListFilterType[] = [TaskListFilterType.ALL, TaskListFilterType.OPEN, TaskListFilterType.DONE];
  activeTaskFilterType: TaskListFilterType = TaskListFilterType.ALL;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  addTask(title: string) {
    const task: Task = {title, done: false};
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  activateFilterType(type: string) {
    this.activeTaskFilterType = TaskListFilterType[type];
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks
      .filter(task => {
        if (this.activeTaskFilterType === TaskListFilterType.ALL) {
          return true;
        } else if (this.activeTaskFilterType === TaskListFilterType.OPEN) {
          return !task.done;
        } else {
          return task.done;
        }
      });
  }

}
