import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Activity, ActivitySliderSelection } from "../../model";

@Component({
  selector: 'mac-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesComponent {
  @Input() activities: Activity[];
  @Input() selectedActivities: Activity[];
  @Output() outSelectedChange = new EventEmitter<ActivitySliderSelection>();

  constructor() {
  }

  selectionChange(selection: ActivitySliderSelection) {
    this.outSelectedChange.emit(selection);
  }

}
