import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  map,
  expand,
  delay,
  switchMap,
  concatMap,
  mergeMap,
  scan,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Campus } from './campus';

@Injectable({
  providedIn: 'root',
})
export class FetchCampusesService {
  campusPage: number = 1;
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.intra.42.fr/v2/campus?page=';

  fetchCampusPage(page: number): Observable<Campus[]> {
    const url = `${this.apiUrl}${page}`;
    return this.http.get<Campus[]>(url);
  }

  fetchAllCampuses(token: string): Observable<Campus[]> {
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
