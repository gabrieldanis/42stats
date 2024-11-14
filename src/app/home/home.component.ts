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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardBodyComponent, CardComponent],
  template: `
    <section>
      <ul>
        @for (capmpus of allCampuses; track campus.id) {
          <li>{{ campus }}</li>
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
  allCampuses!: Promise<Campus[] | []>;

  constructor(public apiDataService: ApidataService) {}
  ngOnInit() {
    console.log('this is token: ' + this.apiToken);
    this.usersSignal = toSignal(this.apiDataService.getData(this.apiToken), {
      injector: this._injector,
      initialValue: [],
    });
    this.allCampuses = this.getCampuses();
  }

  private apiUrl = 'https://api.intra.42.fr';

  async getCampuses(): Promise<Campus[] | []> {
    const campuses = await fetch(
      this.apiUrl + '/v2/campus?arg1={page: {number: 2}}',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      },
    );
    return (await campuses.json()) ?? [];
  }
}
