import 'zone.js';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes, routerFeatures } from './app/app.routing';
import {
  withInterceptorsFromDi,
  provideHttpClient
} from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { getRouterBasename } from './app/helpers/app.helper';
import { APP_BASE_HREF } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, ...routerFeatures),
    { provide: APP_BASE_HREF, useValue: getRouterBasename() },
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
