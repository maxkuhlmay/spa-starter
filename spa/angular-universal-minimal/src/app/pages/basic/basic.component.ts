import { Component, Input } from '@angular/core';
import { EditableArea } from '@magnolia/angular-editor';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  standalone: true,
  imports: [EditableArea]
})
export class BasicComponent {
  @Input() title: any;

  @Input() main: any;
  @Input() extras: any;
  // metadata
  @Input() metadata: any;
}
