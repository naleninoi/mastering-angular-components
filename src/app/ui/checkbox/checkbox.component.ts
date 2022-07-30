import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mac-checkbox',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Output() outCheck = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  check(target: any) {
    this.outCheck.emit(target.checked);
  }

}
