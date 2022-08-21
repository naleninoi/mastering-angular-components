import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {User} from "../../model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'mac-profile-picture',
  templateUrl: './profile-picture.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePictureComponent implements OnInit, OnChanges {

  @Input() user: User;
  pictureSafeUrl: SafeResourceUrl;

  constructor(
    private sanitazer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.pictureSafeUrl = this.sanitazer
        .bypassSecurityTrustResourceUrl(this.user.pictureUrl);
    }
  }



}
