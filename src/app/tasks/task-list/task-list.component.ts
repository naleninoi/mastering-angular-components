import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {Task, TaskListFilterType} from 'src/app/model';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() taskFilterTypes: TaskListFilterType[];
  @Input() activeTaskFilterType: TaskListFilterType;
  @Input() tasks: Task[];
  @Output() outAddTask = new EventEmitter<string>();
  @Output() outActivateFilterType = new EventEmitter<TaskListFilterType>();
  @Output() outUpdateTask = new EventEmitter<Task>();

  addTask(title: string) {
    this.outAddTask.emit(title);
  }

  activateFilterType(filterType: string) {
    this.outActivateFilterType.emit(TaskListFilterType[filterType]);
  }

  updateTask(task: Task) {
    this.outUpdateTask.emit(task);
  }

}
