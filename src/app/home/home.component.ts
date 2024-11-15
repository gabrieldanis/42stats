import {
  Component,
  Input,
  Signal,
  OnInit,
  signal,
  inject,
  Injector,
} from '@angular/core';
import { User } from './../user';
import { Campus } from './../campus';
import { ApidataService } from './../apidata.service';
import { CardComponent } from './../card/card.component';
import { CardBodyComponent } from './../card-body/card-body.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FetchCampusesService } from '../fetch-campuses.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardBodyComponent, CardComponent],
  template: `
    <section>
      <ul>
        @for (campus of this.allCampuses; track campus.id) {
          <li>{{ campus.name }}</li>
        }
      </ul>
    </section>
    <section class="wrapper">
      @if (usersSignal(); as users) {
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
              ><p>{{ user.user.location }}</p></app-card-body
            >
            <p>{{ user.user.id }}</p>
          </app-card>
        }
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @Input() apiToken!: string;
  usersSignal: Signal<User[] | undefined> = signal(undefined);
  private _injector = inject(Injector);
  allCampuses: Campus[] = [];

  constructor(
    public apiDataService: ApidataService,
    public fetchCampuses: FetchCampusesService,
  ) {}

  ngOnInit() {
    console.log('this is token: ' + this.apiToken);
    this.usersSignal = toSignal(this.apiDataService.getData(this.apiToken), {
      injector: this._injector,
      initialValue: [],
    });

    this.fetchCampuses.fetchAllCampuses(this.apiToken).subscribe({
      next: (result: Campus[]) => {
        this.allCampuses = this.allCampuses.concat(result);
      },
      error: (error: any) => {
        console.error('Failed to fetch data', error);
      },
    });
  }
}
