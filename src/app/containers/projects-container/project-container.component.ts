import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from "rxjs";
import {Project, Tab} from "../../model";
import {ProjectService} from "../../projects/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, take } from "rxjs/operators";

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
  activeTab: Observable<Tab>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedProject = combineLatest([this.projectService.getProjects(), this.route.params])
      .pipe(
        map(([projects, routeParams]) => {
          return projects.find(project => project.id === +routeParams.projectId)
        })
      );
    this.activeTab = combineLatest([this.selectedProject, this.route.url])
      .pipe(
        map(([project]) =>
          this.tabs.find(tab => this.router.isActive(`/projects/${project.id}/${tab.id}`, false)))
      );
  }

  activateTab(tab: Tab) {
    this.selectedProject.pipe(
      take(1),
    ).subscribe((project: Project) => this.router.navigate(['/projects', project.id, tab.id]));
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project);
  }

}
