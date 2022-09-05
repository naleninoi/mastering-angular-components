import { Route } from "@angular/router";
import { ProjectContainerComponent } from "./containers/projects-container/project-container.component";

export const routes: Route[] = [
  {
    path: 'projects/:projectId',
    component: ProjectContainerComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/projects/1'
  }
];
