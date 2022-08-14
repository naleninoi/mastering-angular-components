import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "./model";
import {ProjectService} from "./projects/project.service";

@Component({
  selector: 'mac-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  projects: Observable<Project[]>;
  selectedProject: Observable<Project>;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.selectedProject = this.projectService.getSelectedProject();
  }

  selectProject(id: number) {
    this.projectService.selectProject(id);
  }


}
