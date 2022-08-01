import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mac-toggle',
  templateUrl: './toggle.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {
  @Input() buttonList: string[];
  @Input() activeButton: string;
  @Output() outActivate = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (!this.activeButton) {
      this.activeButton = this.buttonList[0];
    }
  }

  activate(button: string) {
    this.outActivate.emit(button);
  }

}
