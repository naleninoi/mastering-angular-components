import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../users/user.service";
import { BehaviorSubject } from "rxjs";
import { Activity, ProjectActivity, User } from "../model";
import { map, mergeMap, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private activities = new BehaviorSubject<Activity[]>([]);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.loadActivities();
  }

  private loadActivities() {
    this.http.get<Activity[]>('/api/activities')
      .subscribe(response => {
        console.log(response);
        this.activities.next(response);
      });
  }

  getActivities() {
    return this.activities.asObservable()
      .pipe(
        map(activities => activities.sort((a, b) => b.time - a.time))
      );
  }

  logProjectActivity(projectId: number, category: string, title: string, message: string) {
    this.userService.getCurrentUser()
      .pipe(
        take(1),
        mergeMap((user: User, i) => {
          const newActivity: ProjectActivity = {
            kind: 'project',
            time: +new Date(),
            projectId,
            user,
            category,
            title,
            message
          };
          return this.http.post('/api/activities', newActivity)
        })
      ).subscribe(() => this.loadActivities());
  }
}
