import { Injectable } from '@angular/core';
import { Task } from '../model';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TaskService {

  private tasks: Task[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.loadTasks();
  }

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  addTask(task: Task) {
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1
    });
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks[index] = task;
  }

  private loadTasks() {
    this.http.get<Task[]>('/api/tasks').subscribe(tasks => this.tasks = tasks);
  }

}
