import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from "rxjs";
import {Project, Tab} from "../../model";
import {ProjectService} from "../../projects/project.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

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
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.selectedProject = combineLatest([this.projectService.getProjects(), this.route.params])
      .pipe(
        map(([projects, routeParams]) => {
          return projects.find(project => project.id === +routeParams.projectId)
        })
      );
  }

  activateTab(tab: Tab) {
    this.activeTab = tab;
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project);
  }

}
