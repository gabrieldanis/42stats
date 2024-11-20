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

  // fetchCampusesPage(page: number, token: string): Observable<Campus[]> {
  //   const url = `${this.apiUrl}${page}`;
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<Campus[]>(url, { headers });
  // }

  // fetchCampusPage(page: number, token: string): Observable<Campus[]> {
  fetchCampusPage(page: number): Observable<Campus[]> {
    const url = `${this.apiUrl}${page}`;
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });
    // return this.http.get<Campus[]>(url, { headers });
    return this.http.get<Campus[]>(url);
  }

  fetchAllCampuses(token: string): Observable<Campus[]> {
    // return this.fetchCampusPage(this.campusPage, token).pipe(
    return this.fetchCampusPage(this.campusPage).pipe(
      expand((data: Campus[]) => {
        if (data.length > 0) {
          this.campusPage++;
          return of(null).pipe(
            delay(150), // Add a delay of 1 second before making the next request
            mergeMap(() => this.fetchCampusPage(this.campusPage)),
          );
        } else {
          return of([]);
        }
      }),
      scan((acc: Campus[], data: Campus[]) => acc.concat(data), []),
      map((data) => data.filter((item) => item !== null)),
    );
  }
}

// async getCampuses(token: string) {
//   while (true) {
//     try {
//       const response = await fetch(
//         this.apiUrl + `/v2/campus?page=${this.campusPage}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error(`Error fetching campuses: ${response.statusText}`);
//       }
//       this.currentCampuses = await response.json();
//       console.log(this.currentCampuses);
//       this.allCampuses = this.allCampuses.concat(this.currentCampuses);
//       await new Promise((r) => setTimeout(r, 1000));
//       this.campusPage += 1;
//       if (!this.currentCampuses.length) {
//         return;
//       }
//     } catch (error) {
//       console.error(error);
//       break;
//     }
//   }
// }
