import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Tokendata } from './tokendata';
import { User } from './user';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ApidataService {
  constructor(private http: HttpClient) {}

  private uid =
    'u-s4t2ud-36d5e8f446dc7d9d5dbc017af3faf0582db3e85bc848695a7b621084331b6d35';
  private secret =
    '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';
  private apiUrl = 'https://api.intra.42.fr';

  fetchUsers(token: string, id: number): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.apiUrl}/v2/cursus_users/?filter[campus_id]=${id}&page[number]=1`;
    return this.http.get<User[]>(url, { headers });
  }
}
