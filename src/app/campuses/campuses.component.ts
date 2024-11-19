import {
  Component,
  effect,
  inject,
  Inject,
  input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { FetchCampusesService } from '../fetch-campuses.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap, tap, using } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-campuses',
  standalone: true,
  imports: [RouterModule],
  template: ` @if (campuses(); as campuses) {
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
export class CampusesComponent implements OnInit {
  apiCampusData = inject(FetchCampusesService);
  apiDataService = inject(ApidataService);
  router = inject(Router);
  readonly token = input.required<string>();

  constructor() {
    effect(() => console.log(`this is token in campuses: ${this.token()}`));
  }

  goToCampus(id: number) {
    const token = this.token();
    this.router.navigate(['campus/', id], { queryParams: { token } });
  }

  ngOnInit() {}
  campuses = toSignal(
    toObservable(this.token).pipe(
      switchMap((token) => {
        return this.apiCampusData.fetchAllCampuses(token);
      }),
    ),
  );
}
