import { Component, inject, input, Signal } from '@angular/core';
import { ApidataService } from '../apidata.service';
import { CardComponent } from '../card/card.component';
import { CardBodyComponent } from '../card-body/card-body.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../user';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardComponent, CardBodyComponent],
  template: `
    <section class="wrapper">
      @if (users(); as users) {
        @for (user of users; track user.id) {
          <app-card>
            <img
              [src]="user.user.image.versions.small"
              [alt]="user.user.displayname"
              width="300px"
              height="250px"
              class="profile-image"
            />
            <h2>{{ user.user.displayname }}</h2>
            <h4>{{ user.level }}</h4>
            <app-card-body
              ><p>{{ user.user.email }}</p>
              <p>{{ user.user.id }}</p></app-card-body
            >
          </app-card>
        }
      }
    </section>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  apiDataService = inject(ApidataService);
  route: ActivatedRoute = inject(ActivatedRoute);
  campusId = 0;
  users: Signal<User[] | undefined>;

  constructor() {
    this.campusId = Number(this.route.snapshot.params['id']);
    this.users = toSignal(this.apiDataService.fetchUsers(this.campusId));
  }
}
