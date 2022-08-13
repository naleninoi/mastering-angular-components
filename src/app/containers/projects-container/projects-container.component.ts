import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from "rxjs";
import {Project, Tab} from "../../model";
import {ProjectService} from "../../projects/project.service";

@Component({
  selector: 'mac-projects-container',
  templateUrl: './projects-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsContainerComponent implements OnInit {

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

}