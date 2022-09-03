import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User, Comment } from "../../model";

@Component({
  selector: 'mac-comment',
  templateUrl: './comment.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input() comment: Comment;
  @Input() user: User;
  @Output() outUpdateComponent = new EventEmitter<Comment>();

  updateComment(content: string) {
    this.outUpdateComponent.emit({
      ...this.comment,
      content
    });
  }

}
