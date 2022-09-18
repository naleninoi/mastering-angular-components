import {InMemoryDbService} from "angular-in-memory-web-api";
import { Activity, Project, Task, User } from "./model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Database implements InMemoryDbService {
  createDb(): {} {
    const now = +new Date();

    const projects: Project[] = [
      {id: 1, title: 'My first project', description: 'This is your first project.', comments: []},
      {id: 2, title: 'My second project', description: 'This is your second project.', comments: []},
    ];

    const tasks: Task[] = [
      {id: 1, projectId: 1, title: 'Task 1', done: false},
      {id: 2, projectId: 1, title: 'Task 2', done: true},
      {id: 3, projectId: 1, title: 'Task 3', done: false},
      {id: 4, projectId: 1, title: 'Task 4', done: false}
    ];

    const users: User[] = [
      {id: 1, name: 'Evok', pictureUrl: '/assets/user.png'}
    ];

    const activities: Activity[] = [
      {
        id: 1,
        kind: 'project',
        user: users[0],
        time: now - 1000 * 60 * 60 * 8,
        projectId: 1,
        category: 'tasks',
        title: 'A task was updated',
        message: 'The task \'Task 1\' was updated on #project-1'
      },
      {
        id: 2,
        kind: 'project',
        user: users[0],
        time: now - 1000 * 60 * 60 * 5,
        projectId: 2,
        category: 'tasks',
        title: 'A task was updated',
        message: 'The task \'Task 1\' was updated on #project-2'
      },
      {
        id: 3,
        kind: 'project',
        user: users[0],
        time: now - 1000 * 60 * 60 * 2,
        projectId: 2,
        category: 'tasks',
        title: 'A task was updated',
        message: 'The task \'Task 2\' was updated on #project-1'
      },
    ];

    return {projects, tasks, users, activities}}
}
