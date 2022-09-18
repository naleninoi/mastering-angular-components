import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from "rxjs";
import { Comment, CommentUpdate, Project, User } from "../../model";
import { ProjectService } from "../../projects/project.service";
import { UserService } from "../../users/user.service";
import { map, take } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'mac-project-comments-container',
  templateUrl: './project-comments-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCommentsContainerComponent implements OnInit {
  user: Observable<User>;
  selectedProject: Observable<Project>;
  projectComments: Observable<Comment[]>;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.selectedProject = combineLatest([this.projectService.getProjects(), this.route.parent.params])
      .pipe(
        map(([projects, routeParams]) =>
        projects.find(project => project.id === +routeParams.projectId))
      );
    this.projectComments = this.selectedProject.pipe(
      map(project => project.comments)
    );
  }

  createComment(comment: Comment) {
    this.selectedProject.pipe(
      take(1),
    ).subscribe(
      project => this.projectService.updateProject({
        ...project,
        comments: [...project.comments, comment]
      })
    );
  }

  updateComment(update: CommentUpdate) {
    this.selectedProject.pipe(
      take(1),
    ).subscribe(project => {
      const updatedComments = project.comments.slice();
      updatedComments[update.index] = update.comment;
      this.projectService.updateProject({
        ...project,
        comments: updatedComments
      });
      }
    );
  }

}
