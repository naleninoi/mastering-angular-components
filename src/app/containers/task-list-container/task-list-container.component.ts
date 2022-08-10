import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Task, TaskListFilterType} from 'src/app/model';
import {TaskService} from 'src/app/tasks/task.service';

@Component({
  selector: 'mac-task-list-container',
  templateUrl: './task-list-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent implements OnInit {

  tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  taskFilterTypes: TaskListFilterType[] = [TaskListFilterType.ALL, TaskListFilterType.OPEN, TaskListFilterType.DONE];
  activeTaskFilterType = new BehaviorSubject<TaskListFilterType>(TaskListFilterType.ALL);

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  activateFilterType(type: string) {
    const filterType = TaskListFilterType[type];
    this.activeTaskFilterType.next(filterType);
  }

  addTask(title: string) {
    const task: Task = {title, done: false};
    this.taskService.addTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
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
