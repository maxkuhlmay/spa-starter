import { Component, Input, Inject } from '@angular/core';
import {
  getLanguages,
  getCurrentLanguage,
  changeLanguage
} from 'src/app/helpers/app.helper';
import { environment } from 'src/environments/environment';
import { DOCUMENT, NgFor } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  standalone: true,
  imports: [NgFor, RouterLinkActive, RouterLink]
})
export class NavigationComponent {
  @Input() navItems!: any;
  languages: Array<string>;
  currentLanguage: string;

  @Input() content!: object;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.languages = getLanguages();
    this.currentLanguage = getCurrentLanguage(this.document.location);
  }

  getLink(item: any): string {
    const lang: string =
      getCurrentLanguage(this.document.location) === 'en'
        ? ''
        : '/' + getCurrentLanguage(this.document.location) + '/';
    return lang + item['@path'].replace(environment.appBase, '');
  }

  clickLanguage(language: string): string {
    return changeLanguage(language, this.document.location);
  }
}
