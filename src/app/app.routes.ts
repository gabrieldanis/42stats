import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Choose Campus',
  },
  {
    path: 'campus:id',
    component: DetailsComponent,
    title: 'Your Campus',
  },
];
