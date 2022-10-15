import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { Activity, ActivitySliderSelection } from "../../model";
import { ProjectService } from "../../projects/project.service";
import { ActivitiesService } from "../../activities/activities.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: 'mac-project-activities-container',
  templateUrl: './project-activities-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectActivitiesContainerComponent implements OnInit {
  activities: Observable<Activity[]>;
  selection = new BehaviorSubject<ActivitySliderSelection | null>(null);
  selectedActivities: Observable<Activity[]>;

  constructor(
    private projectService: ProjectService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activities = combineLatest([this.activitiesService.getActivities(), this.route.parent.params])
      .pipe(
        map(([activities, routeParams]) => activities.filter(
          activity => activity.kind === 'project' && activity.projectId === +routeParams.projectId
        ))
      );
    this.selectedActivities = combineLatest([this.activities, this.selection])
      .pipe(
        map(([activities, selection]) => {
          if (selection) {
            return activities.filter (activity =>
              activity.time >= selection.start && activity.time <= selection.end);
          } else {
            return activities;
          }
        })
      );
  }

  selectionChange(selection: ActivitySliderSelection) {
    this.selection.next(selection);
  }

}
