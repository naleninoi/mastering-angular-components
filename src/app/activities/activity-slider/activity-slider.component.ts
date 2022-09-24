import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter, ElementRef, OnChanges, SimpleChanges
} from '@angular/core';
import { Activity, ActivitySliderSelection } from "../../model";

@Component({
  selector: 'mac-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitySliderComponent implements OnChanges {
  @Input() activities: Activity[];
  @Output() outSelectionChange = new EventEmitter<ActivitySliderSelection>();

  padding = 20;
  timeFirst: number;
  timeLast: number;
  timeSpan: number;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && this.activities) {
      if (this.activities.length === 1) {
        this.timeFirst = this.timeLast = this.activities[0].time;
      } else if (this.activities.length > 1) {
        this.timeFirst = this.activities[this.activities.length - 1].time;
        this.timeLast = this.activities[0].time;
      } else {
        this.timeFirst = this.timeLast = new Date().getTime();
      }
      this.timeSpan = Math.max(1, this.timeLast - this.timeFirst);
    }
  }

  totalWidth() {
    return this.elementRef.nativeElement.clientWidth - this.padding * 2;
  }

  projectTime(time: number) {
    const position = this.padding + (time - this.timeFirst) / this.timeSpan * this.totalWidth();
    return position / this.elementRef.nativeElement.clientWidth * 100;
  }

  projectLength(length: number) {
    return this.timeFirst + (length - this.padding) / this.totalWidth() * this.timeSpan;
  }
}
