import {InMemoryDbService} from "angular-in-memory-web-api";
import {Task} from "./model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Database implements InMemoryDbService {
  createDb(): {} {
    const tasks: Task[] = [
      {id: 1, title: 'Task 1', done: false},
      {id: 2, title: 'Task 2', done: true},
      {id: 3, title: 'Task 3', done: false},
      {id: 4, title: 'Task 4', done: false}
    ];
    return {tasks}}
}
