import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PresentationComponent } from './pages/presentation/presentation.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'presentation', component: PresentationComponent },
];
