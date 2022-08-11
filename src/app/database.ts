import {InMemoryDbService} from "angular-in-memory-web-api";
import {Project, Task} from "./model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Database implements InMemoryDbService {
  createDb(): {} {
    const projects: Project[] = [
      {id: 1, title: 'My first project', description: 'This is your first project.'},
      {id: 2, title: 'My second project', description: 'This is your second project.'},
    ];

    const tasks: Task[] = [
      {id: 1, projectId: 1, title: 'Task 1', done: false},
      {id: 2, projectId: 1, title: 'Task 2', done: true},
      {id: 3, projectId: 1, title: 'Task 3', done: false},
      {id: 4, projectId: 1, title: 'Task 4', done: false}
    ];
    return {projects, tasks}}
}
