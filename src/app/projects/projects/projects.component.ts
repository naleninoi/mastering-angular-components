import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Project, Tab} from 'src/app/model';

@Component({
  selector: 'mac-projects',
  templateUrl: './projects.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  @Input() project: Project;
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
