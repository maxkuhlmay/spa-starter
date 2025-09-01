import {
  PreloadAllModules,
  RouterFeatures,
  Routes,
  withPreloading
} from '@angular/router';
import { RootComponent } from './root.component';

export const routes: Routes = [
  {
    path: '**',
    component: RootComponent,
    pathMatch: 'full'
  }
];

export const routerFeatures: RouterFeatures[] = [
  withPreloading(PreloadAllModules) // <- comment this line for activate lazy load
  // withHashLocation()
];
