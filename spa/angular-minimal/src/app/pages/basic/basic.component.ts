import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditableArea } from '@magnolia/angular-editor';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  standalone: true,
  imports: [EditableArea, RouterLink]
})
export class BasicComponent {
  @Input() title: any;

  @Input() main: any;
  @Input() extras: any;
  // metadata
  @Input() metadata: any;
}
