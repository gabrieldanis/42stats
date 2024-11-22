import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import { ApidataService } from '../apidata.service';
import { CardComponent } from '../card/card.component';
import { CardBodyComponent } from '../card-body/card-body.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../user';
import { Campus } from '../campus';
import { FetchCampusesService } from '../fetch-campuses.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardComponent, CardBodyComponent],
  template: `
    <section class="wrapper">
      <article>
        <h3>{{ campus()?.name }}</h3>
        <h4>{{ campus()?.country }}</h4>
        <ul>
          <li>address: {{ campus()?.address }}</li>
          <li>users: {{ campus()?.users_count }}</li>
          <li>active: {{ campus()?.active }}</li>
          <li>created at: {{ campus()?.endpoint?.created_at }}</li>
        </ul>
      </article>
      @if (sortedUsers(); as users) {
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
export class DetailsComponent implements AfterViewInit {
  apiDataService = inject(ApidataService);
  apiCampusService = inject(FetchCampusesService);
  route: ActivatedRoute = inject(ActivatedRoute);
  campusId = 0;
  users: Signal<User[] | undefined>;
  campuses = this.apiCampusService.getCampuses();

  campus = computed(() => {
    const campuses = this.campuses();
    if (campuses) {
      return campuses.find((obj) => obj.id === this.campusId);
    }
    return undefined;
  });

  constructor() {
    this.apiDataService.resetPageCounter();
    this.campusId = Number(this.route.snapshot.params['id']);
    this.users = toSignal(this.apiDataService.fetchAllUsers(this.campusId));
  }

  ngAfterViewInit(): void {}

  sortedUsers: Signal<User[] | undefined> = computed(() => {
    const users = this.users();
    return users?.sort((a, b) => b.level - a.level);
  });
}
