import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { FetchCampusesService } from '../fetch-campuses.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ApidataService } from '../apidata.service';
import { FormsModule } from '@angular/forms';
import { Campus } from '../campus';

@Component({
  selector: 'app-campuses',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: ` <form>
      <label>Search</label
      ><input
        [ngModel]="query()"
        (ngModelChange)="query.set($event)"
        [ngModelOptions]="{ standalone: true }"
        placeholder="start typing"
      />
    </form>
    <p>{{ query() }}</p>
    @if (foundCampuses(); as campus) {
      <section class="campus-content">
        <a (click)="goToCampus(campus.id)" class="campus-field">{{
          campus.name
        }}</a>
      </section>
    }
    ,
    @if (campuses(); as campuses) {
      <section class="campus-content">
        @for (campus of campuses; track campus.id) {
          <a (click)="goToCampus(campus.id)" class="campus-field">{{
            campus.name
          }}</a>
        }
      </section>
    }`,
  styleUrl: './campuses.component.css',
})
export class CampusesComponent {
  apiCampusData = inject(FetchCampusesService);
  apiDataService = inject(ApidataService);
  router = inject(Router);
  readonly token = input.required<string>();
  query = signal('');
  campuses = toSignal(
    toObservable(this.token).pipe(
      switchMap((token) => {
        return this.apiCampusData.fetchAllCampuses(token);
      }),
    ),
    { initialValue: [] },
  );

  foundCampuses: Signal<Campus | undefined> = computed(() =>
    this.campuses().find((campus) => campus.name.startsWith(this.query())),
  );

  goToCampus(id: number) {
    const token = this.token();
    this.router.navigate(['campus/', id], { queryParams: { token } });
  }
}
