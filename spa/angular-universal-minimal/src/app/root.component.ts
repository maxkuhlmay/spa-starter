import { Component, Inject, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EditorContextService, EditablePage } from '@magnolia/angular-editor';

import { getLanguages } from 'src/app/helpers/app.helper';
import { environment } from '../environments/environment';
import { config } from '../magnolia.config';
import { DOCUMENT } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  templateUrl: './root.component.html',
  standalone: true,
  imports: [NavigationComponent, EditablePage]
})
export class RootComponent {
  @Input() content: any;
  @Input() navItems: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private editorContext: EditorContextService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.editorContext.setComponentMapping(config.componentMapping);

    // refresh the content on navigation event
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        await this.getContent();
      }
    });
  }

  async getContent() {
    const languages = getLanguages();
    const nodeName = environment.rootPath;
    const location = this.document.location;

    const magnoliaContext = this.editorContext.getMagnoliaContext(
      location.pathname + location.search,
      nodeName,
      languages
    );

    this.http
      .get(
        `${environment.restUrlBase}${magnoliaContext.nodePath}${magnoliaContext.search}`
      )
      .subscribe((content) => {
        this.content = content;
      });

    this.http.get(`${environment.navUrl}${nodeName}`).subscribe((data: any) => {
      let items = data['@nodes'].map((nodeName: any) => {
        return data[nodeName];
      });
      this.navItems = [data, ...items];
    });

    if (magnoliaContext.isMagnolia) {
      this.http
        .get(
          `${environment.templateAnnotationsBase}${magnoliaContext.nodePath}`
        )
        .subscribe((templateAnnotations) => {
          this.editorContext.setTemplateAnnotations(templateAnnotations);
        });
    }
  }
}
