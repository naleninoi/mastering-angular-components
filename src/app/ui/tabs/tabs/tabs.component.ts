import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Tab} from "../../../model";

@Component({
  selector: 'mac-tabs',
  templateUrl: './tabs.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {
  @Input() tabs: Tab[];
  @Input() activeTab: Tab;
  @Output() outActivateTab = new EventEmitter<Tab>();

  constructor() { }

  ngOnInit(): void {
  }

  activateTab(tab: Tab) {
    this.outActivateTab.emit(tab);
  }

}
