import { Component, inject, Inject, input, Signal } from '@angular/core';
import { FetchCampusesService } from '../fetch-campuses.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap } from 'rxjs';
import { Campus } from '../campus';

@Component({
  selector: 'app-campuses',
  standalone: true,
  imports: [],
  template: ` @if (campuses(); as campuses) {
    <section class="campus-content">
      @for (campus of campuses; track campus.id) {
        <div class="campus-field">{{ campus.name }}</div>
      }
    </section>
  }`,
  styleUrl: './campuses.component.css',
})
export class CampusesComponent {
  apiCampusData = inject(FetchCampusesService);
  token = input.required<string>();
  campuses = toSignal(
    toObservable(this.token).pipe(
      switchMap((token) => {
        return this.apiCampusData.fetchAllCampuses(token);
      }),
    ),
  );
}
