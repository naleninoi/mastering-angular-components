import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {Project, Task, User} from "./model";
import {ProjectService} from "./projects/project.service";
import {UserService} from "./users/user.service";
import {TaskService} from "./tasks/task.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'mac-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  openTasksCount: Observable<number>;
  user: Observable<User>;
  projects: Observable<Project[]>;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.user = this.userService.getCurrentUser();
    this.openTasksCount = this.taskService.getTasks()
      .pipe(
        map((tasks: Task[]) => {
          return tasks
            .filter(task => !task.done)
            .length;
        })
      );
  }

}
