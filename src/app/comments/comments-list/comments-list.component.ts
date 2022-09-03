import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild, ElementRef
} from '@angular/core';
import { User, Comment, CommentUpdate } from "../../model";

@Component({
  selector: 'mac-comments-list',
  templateUrl: './comments-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent {
  @Input() user: User;
  @Input() comments: Comment[];
  @Output() outUpdateComment = new EventEmitter<CommentUpdate>();
  @Output() outCreateComment = new EventEmitter<Comment>();
  @ViewChild('commentContentEditable') commentContentEditable: ElementRef;

  createComment() {
    this.outCreateComment.emit({
      user: this.user,
      time: +new Date(),
      content: this.commentContentEditable.nativeElement.textContent
    });
  }

  updateComment(index: number, comment: Comment) {
    this.outUpdateComment.next({
      index,
      comment
    });
  }

}
