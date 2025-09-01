import { Component, Input } from '@angular/core';
import { EditableArea } from '@magnolia/angular-editor';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [EditableArea]
})
export class ContactComponent {
  @Input() title: any;

  @Input() main: any;
  // metadata
  @Input() metadata: any;
}
