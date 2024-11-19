import {
  Component,
  Input,
  Signal,
  OnInit,
  signal,
  inject,
  Injector,
  computed,
  input,
} from '@angular/core';
import { User } from './../user';
import { Campus } from './../campus';
import { ApidataService } from './../apidata.service';
import { CardComponent } from './../card/card.component';
import { CardBodyComponent } from './../card-body/card-body.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FetchCampusesService } from '../fetch-campuses.service';
import { map, Observable, of, skip, switchMap, take } from 'rxjs';
import { Tokendata } from '../tokendata';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardBodyComponent, CardComponent, AsyncPipe],
  template: `
    <section></section>
    <section class="wrapper">
      @if (users(); as users) {
        @for (user of users; track user.id) {
          <!-- sending to card -->
          <app-card>
            <img
              [src]="user.user.image.versions.small"
              [alt]="user.user.displayname"
              class="image"
            />
            <h2>{{ user.user.displayname }}</h2>
            <h4>{{ user.level }}</h4>

            <!-- sending to bio within card -->
            <app-card-body
              ><p>{{ user.user.email }}</p>
              <p>{{ user.user.id }}</p></app-card-body
            >
          </app-card>
        }
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
// export class HomeComponent implements OnInit {
export class HomeComponent {
  // @Input() tokenData!: Signal<Tokendata | undefined>;
  token = input.required<string>();
  apiDataService = inject(ApidataService);
  users = toSignal(
    toObservable(this.token).pipe(
      switchMap((token) => {
        return this.apiDataService.fetchUsers(token);
      }),
    ),
  );

  // users = computed(() => {
  //   if (this.tokenData()) {
  //     return this.apiDataService.fetchUsers(this.tokenData()!.access_token);
  //   } else {
  //     return undefined;
  //   }
  // });
  // users: Signal<User[] | undefined> = computed(() => {});
  // private loadUsers(apiToken: string) {
  //   const usersSignal = toSignal(this.apiDataService.fetchUsers(apiToken), {
  //     initialValue: [],
  //   });
  //   effect(() => {
  //     const userList = usersSignal();
  //     if (userList.length > 0) {
  //       this.users.set(userList);
  //       this.isLoading.set(false);
  //     }
  //   });
  // }

  // ngOnInit() {
  //   console.log('this is token: ' + this.apiToken);
  //   this.usersSignal = toSignal(this.apiDataService.fetchUsers(this.apiToken), {
  //     injector: this._injector,
  //     initialValue: [],
  //   });

  //   this.fetchCampuses.fetchAllCampuses(this.apiToken).subscribe({
  //     next: (result: Campus[]) => {
  //       this.allCampuses = this.allCampuses.concat(result);
  //     },
  //     error: (error: any) => {
  //       console.error('Failed to fetch data', error);
  //     },
  //   });
  // }
}
