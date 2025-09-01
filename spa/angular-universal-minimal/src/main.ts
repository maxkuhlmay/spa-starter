import { APP_ID, enableProdMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes, routerFeatures } from './app/app.routing';
import { bootstrapApplication } from '@angular/platform-browser';
import { StateInterceptor } from './app/state.interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
  withFetch
} from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: APP_ID, useValue: 'serverApp' },
      provideRouter(routes, ...routerFeatures),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: StateInterceptor,
        multi: true
      },
      provideHttpClient(withInterceptorsFromDi(), withFetch())
    ]
  }).catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
