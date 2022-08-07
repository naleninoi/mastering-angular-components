import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Task, TaskListFilterType} from 'src/app/model';
import {TaskService} from '../task.service';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  taskFilterTypes: TaskListFilterType[] = [TaskListFilterType.ALL, TaskListFilterType.OPEN, TaskListFilterType.DONE];
  activeTaskFilterType = new BehaviorSubject<TaskListFilterType>(TaskListFilterType.ALL);

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
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }

  activateFilterType(type: string) {
    const filterType = TaskListFilterType[type];
    this.activeTaskFilterType.next(filterType);
  }

  filterTasks() {
    this.filteredTasks = combineLatest([this.tasks, this.activeTaskFilterType])
      .pipe(
        map(([tasks, activeTaskFilterType]) => {
          return tasks.filter(task => {
            if (activeTaskFilterType === TaskListFilterType.ALL) {
              return true;
            } else if (activeTaskFilterType === TaskListFilterType.OPEN) {
              return !task.done;
            } else {
              return task.done;
            }
          })
        }));
  }

}
