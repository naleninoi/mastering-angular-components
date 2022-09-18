import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Project, Task, TaskListFilterType} from 'src/app/model';
import { ProjectService } from 'src/app/projects/project.service';
import {TaskService} from 'src/app/tasks/task.service';
import { ActivatedRoute } from "@angular/router";
import { ActivitiesService } from "../../activities/activities.service";
import { limitWithEllipsis } from "../../utilities/string-utilities";

@Component({
  selector: 'mac-task-list-container',
  templateUrl: './task-list-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent implements OnInit {
  selectedProject: Observable<Project>;
  tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  taskFilterTypes: TaskListFilterType[] = [TaskListFilterType.ALL, TaskListFilterType.OPEN, TaskListFilterType.DONE];
  activeTaskFilterType = new BehaviorSubject<TaskListFilterType>(TaskListFilterType.ALL);

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.selectedProject = combineLatest([this.projectService.getProjects(), this.route.parent.params])
      .pipe(
        map(([projects, routeParams]) =>
          projects.find(project => project.id === +routeParams.projectId))
      );
    this.tasks = this.selectedProject.pipe(
      switchMap((project) => this.taskService.getProjectTasks(project.id))
    );
    this.filterTasks();
  }

  activateFilterType(type: string) {
    const filterType = TaskListFilterType[type];
    this.activeTaskFilterType.next(filterType);
  }

  addTask(title: string) {
    this.selectedProject
      .pipe(
        take(1)
      )
      .subscribe(project => {
        const task: Task = {
          projectId: project.id,
          title,
          done: false
        };
        this.taskService.addTask(task);
        this.activitiesService.logProjectActivity(
          project.id,
          'tasks',
          'A task was added',
          `A new task ${limitWithEllipsis(title, 30)} was added to #project-${project.id}`
        );
      });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.activitiesService.logProjectActivity(
      task.projectId,
      'tasks',
      'A task was added',
      `A new task ${limitWithEllipsis(task.title, 30)} was added to #project-${task.projectId}`
    );
  }

  filterTasks() {
    this.filteredTasks = combineLatest([this.tasks, this.activeTaskFilterType])
      .pipe(
        map(([tasks, activeTaskFilterType]) => {
          return tasks.filter(task => {
            if (activeTaskFilterType === TaskListFilterType.ALL) {
              return true;
            } else if (activeTaskFilterType === TaskListFilterType.OPEN) {
              return !task.done;
            } else {
              return task.done;
            }
          })
        }));
  }

}
