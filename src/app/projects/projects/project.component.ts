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
  selector: 'mac-project',
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() tabs: Tab[];
  @Input() activeTab: Tab;
  @Output() outActivateTab = new EventEmitter<Tab>();
  @Output() outUpdateProject = new EventEmitter<Project>();

  constructor() { }

  ngOnInit(): void {
  }

  activateTab(tab: Tab) {
    this.outActivateTab.emit(tab);
  }

  updateTitle(title: string) {
    this.outUpdateProject.emit({
      ...this.project,
      title
    });
  }

  updateDescription(description: string) {
    this.outUpdateProject.emit({
      ...this.project,
      description
    });
  }

}
