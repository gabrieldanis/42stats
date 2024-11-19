import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CampusesComponent } from './campuses/campuses.component';

export const routes: Routes = [
  {
    path: 'campuses',
    component: CampusesComponent,
    title: 'Choose Campus',
    // resolve: { user: userResolver },
    data: { something: 'With query param' },
  },
  {
    path: 'campus/:id',
    component: DetailsComponent,
    title: 'Your Campus',
    data: { something: 'With query param' },
  },
];
