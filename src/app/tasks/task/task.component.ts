import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {

  @Input() task: any;

  @HostBinding('class.done')
  get done() {
    return this.task && this.task.done;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
