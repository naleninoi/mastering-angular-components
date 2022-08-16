import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from "rxjs";
import {Project, Tab} from "../../model";
import {ProjectService} from "../../projects/project.service";

@Component({
  selector: 'mac-project-container',
  templateUrl: './project-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent implements OnInit {

  selectedProject: Observable<Project>;

  tabs: Tab[] = [
    {id: 'tasks', title: 'Tasks'},
    {id: 'comments', title: 'Comments'},
    {id: 'activities', title: 'Activities'}
  ];
  activeTab: Tab = this.tabs[0];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.selectedProject = this.projectService.getSelectedProject();
  }

  activateTab(tab: Tab) {
    this.activeTab = tab;
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project);
  }

}
