import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ProjectService } from "../projects/project.service";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProjectContainerGuard implements CanActivate {
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot) {
    return this.projectService.getProjects()
      .pipe(
        map(projects => {
          const projectExists = !!projects.find(project => project.id === +route.params.projectId);
          if (!projectExists) {
            this.router.navigate(['/projects', projects[0].id]);
          }
          return projectExists;
        })
      );
  }

}
