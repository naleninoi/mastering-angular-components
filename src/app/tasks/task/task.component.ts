import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Task } from 'src/app/model';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() outUpdateTask = new EventEmitter<Task>();

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
  }

  constructor() { }

  ngOnInit(): void {
  }

  updateTask(done: boolean) {
    this.outUpdateTask.emit({
      ...this.task, done
    });
  }

}
