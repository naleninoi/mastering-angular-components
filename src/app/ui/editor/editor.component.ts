import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  AfterViewInit,
  ViewChild, ElementRef, HostBinding, Input, Output, EventEmitter, SimpleChanges, HostListener
} from '@angular/core';

@Component({
  selector: 'mac-editor',
  templateUrl: './editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnChanges, AfterViewInit {
  @ViewChild('editableContentElement') editableContentElement: ElementRef;
  @HostBinding('class.edit-mode') editMode = false;
  @Input() content: string;
  @Input() showControls: boolean;
  @Output() outSaveEdit = new EventEmitter<string>();
  @Output() outCancelEdit = new EventEmitter<never>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.content && this.editableContentElement) {
      this.setEditableContent(this.content);
    }
  }

  ngAfterViewInit(): void {
    this.setEditableContent(this.content);
  }

  @HostListener('click')
  focusEditableContent() {
    if (this.editMode) {
      this.editableContentElement.nativeElement.focus();
    }
  }

  saveEdit() {
    this.editMode = false;
    this.outSaveEdit.emit(this.getEditableContent());
  }

  cancelEdit() {
    this.editMode = false;
    this.setEditableContent(this.content);
    this.outCancelEdit.emit();
  }

  beginEdit() {
    this.editMode = true;
  }

  private getEditableContent() {
    return this.editableContentElement.nativeElement.textContent;
  }

  private setEditableContent(content: string) {
    this.editableContentElement.nativeElement.textContent = content;
  }







}
