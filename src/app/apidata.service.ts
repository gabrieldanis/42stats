import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { expand, map, Observable, of, scan, tap } from 'rxjs';
import { Tokendata } from './tokendata';
import { User } from './user';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ApidataService {
  private uid =
    'u-s4t2ud-36d5e8f446dc7d9d5dbc017af3faf0582db3e85bc848695a7b621084331b6d35';
  private secret =
    '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';
  private apiUrl = 'https://api.intra.42.fr';

  http = inject(HttpClient);
  private userPage = 1;

  resetPageCounter() {
    this.userPage = 1;
  }

  fetchUsers(page: number, id: number): Observable<User[]> {
    const url = `${this.apiUrl}/v2/cursus_users/?filter[campus_id]=${id}&filter[cursus_id]=21&page[number]=${page}`;
    // const url = `${this.apiUrl}/v2/cursus_users/?filter[campus_id]=${id}&page[number]=${page}`;
    return this.http.get<User[]>(url);
  }

  fetchAllUsers(id: number): Observable<User[]> {
    return this.fetchUsers(this.userPage, id).pipe(
      expand((data: User[]) => {
        if (data.length > 0) {
          this.userPage++;
          return this.fetchUsers(this.userPage, id);
        } else {
          return of([]);
        }
      }),
      scan((acc: User[], data: User[]) => acc.concat(data), []),
      map((data) => data.filter((item) => item !== null)),
    );
  }
}
