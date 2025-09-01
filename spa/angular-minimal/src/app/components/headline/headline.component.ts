import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
  standalone: true
})
export class HeadlineComponent {
  @Input() text: any;
}
