import { inject, Injectable, input, Signal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, expand, scan } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Campus } from './campus';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FetchCampusesService {
  campusPage: number = 1;
  private apiUrl = 'https://api.intra.42.fr/v2/campus?page=';
  http = inject(HttpClient);
  campuses = toSignal(this.fetchAllCampuses());

  getCampuses() {
    return this.campuses;
  }

  getCampusById(id: number) {
    console.log('campuses in getCampuses', this.campuses());
    const campuses = this.campuses();
    if (campuses) {
      return campuses[id];
    } else {
      return undefined;
    }
  }

  fetchCampusPage(page: number): Observable<Campus[]> {
    const url = `${this.apiUrl}${page}`;
    return this.http.get<Campus[]>(url);
  }

  fetchAllCampuses(): Observable<Campus[]> {
    return this.fetchCampusPage(this.campusPage).pipe(
      expand((data: Campus[]) => {
        if (data.length > 0) {
          this.campusPage++;
          return this.fetchCampusPage(this.campusPage);
        } else {
          return of([]);
        }
      }),
      scan((acc: Campus[], data: Campus[]) => acc.concat(data), []),
      map((data) => data.filter((item) => item !== null)),
    );
  }
}
