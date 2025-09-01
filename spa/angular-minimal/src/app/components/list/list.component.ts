import { Component, Input } from '@angular/core';
import { EditableArea } from '@magnolia/angular-editor';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [EditableArea]
})
export class ListComponent {
  @Input() items: any;
  // metadata
  @Input() metadata: any;
}
