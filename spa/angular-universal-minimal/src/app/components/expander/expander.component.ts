import { Component, Input } from '@angular/core';
import { EditableArea } from '@magnolia/angular-editor';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, EditableArea]
})
export class ExpanderComponent  {

  @Input() expanderItems: any;

  // metadata
  @Input() metadata: any;

  isExpanded = false;

  toggleArea() {
    this.isExpanded = !this.isExpanded;
  }

}
