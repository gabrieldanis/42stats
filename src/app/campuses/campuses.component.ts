import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { FetchCampusesService } from '../fetch-campuses.service';
import { Router, RouterModule } from '@angular/router';
import { ApidataService } from '../apidata.service';
import { FormsModule } from '@angular/forms';
import { Campus } from '../campus';
import { AuthTokenService } from '../auth-token.service';

@Component({
  selector: 'app-campuses',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: `
    <form class="search-container">
      <label class="search-label">Search</label
      ><input
        #inputElement
        class="search-input"
        [ngModel]="query()"
        (ngModelChange)="query.set($event)"
        [ngModelOptions]="{ standalone: true }"
        placeholder="start typing"
      />
    </form>
    @if (foundCampuses(); as campuses) {
      <section class="campus-content">
        @for (campus of campuses; track campus.id) {
          <a [routerLink]="['campus', campus.id]" class="campus-field">{{
            campus.name
          }}</a>
        }
      </section>
    }
  `,
  styleUrl: './campuses.component.css',
})
export class CampusesComponent {
  apiCampusData = inject(FetchCampusesService);
  apiDataService = inject(ApidataService);
  authTokenService = inject(AuthTokenService);
  router = inject(Router);
  query = signal('');
  searchInput: Signal<ElementRef> = viewChild.required('inputElement');
  campuses: Signal<Campus[] | undefined> = this.apiCampusData.getCampuses();

  constructor() {
    effect(() => {
      this.searchInput().nativeElement.focus();
    });
  }

  foundCampuses: Signal<Campus[] | undefined> = computed(() => {
    const campuses = this.campuses();
    return campuses?.filter((campus) => campus.name.startsWith(this.query()));
  });
}
