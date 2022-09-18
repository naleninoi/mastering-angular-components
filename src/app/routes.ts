import { Route } from "@angular/router";
import { ProjectContainerComponent } from "./containers/projects-container/project-container.component";
import { TaskListContainerComponent } from "./containers/task-list-container/task-list-container.component";
import {
  ProjectCommentsContainerComponent
} from "./containers/project-comments-container/project-comments-container.component";
import { ProjectContainerGuard } from "./guards/project-container.guard";

export const routes: Route[] = [
  {
    path: 'projects/:projectId',
    component: ProjectContainerComponent,
    canActivate: [ProjectContainerGuard],
    children: [
      {
        path: 'tasks',
        component: TaskListContainerComponent
      },
      {
        path: 'comments',
        component: ProjectCommentsContainerComponent
      },
      {
        path: '**',
        redirectTo: 'tasks'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/projects/1'
  }
];
