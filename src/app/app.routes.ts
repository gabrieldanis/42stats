import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CampusesComponent } from './campuses/campuses.component';

export const routes: Routes = [
  {
    path: '',
    component: CampusesComponent,
    title: 'Choose Campus',
  },
  {
    path: 'campus/:id',
    component: DetailsComponent,
    title: 'Your Campus',
  },
];
