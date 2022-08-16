import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Project} from '../model';

@Injectable()
export class ProjectService {
  private projects = new BehaviorSubject<Project[]>([]);
  private selectedProjectId = new BehaviorSubject<number>(1);
  private selectedProject: Observable<Project>;

  constructor(
    private http: HttpClient
  ) {
    this.loadProjects();
    this.selectedProject = combineLatest([this.projects, this.selectedProjectId])
      .pipe(
        map(
          ([projects, selectedProjectId]) => projects.find(project => project.id === selectedProjectId)
          )
      );

  }

  private loadProjects() {
    this.http.get<Project[]>('/api/projects')
      .subscribe(data => this.projects.next(data));
  }

  selectProject(id: number) {
    this.selectedProjectId.next(id);
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  getProjects() {
    return this.projects.asObservable();
  }

  updateProject(project: Project) {
    return this.http
      .post<Project[]>(`/api/projects/${project.id}`, project)
      .subscribe(() => this.loadProjects());
  }
}
