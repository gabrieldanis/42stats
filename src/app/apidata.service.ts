import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tokendata } from './tokendata';
import { User } from './user';

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

  getTokenObservable(): Observable<Tokendata> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.uid)
      .set('client_secret', this.secret);
    return this.http.post<Tokendata>(
      this.apiUrl + '/oauth/token',
      body.toString(),
      {
        headers,
      },
    );
  }

  getToken(): string {
    this.getTokenObservable().subscribe({
      next: (response) => {
        return response.access_token; // geht sicher besser
      },
      error: (error) => {
        return 'error';
      },
    });
    return '';
  }

  getData(token: string): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // this.logCampuses();
    return this.http.get<User[]>(
      this.apiUrl + '/v2/cursus_users/?filter[campus_id]=53&page[number]=28',
      // '/v2/cursus_users/?filter[campus_id]=53#arg1={page: {number: 2}}',
      { headers },
    );
  }

  // logData(): void {
  //   this.getData().subscribe({
  //     next: (data) => {
  //       console.log('42 data:', data);
  //       console.log((data as User[])[23].user.first_name); // geht sicher besser
  //     },
  //     error: (error) => {
  //       console.error('Error fetching token:', error);
  //     },
  //   });
  // }

  getCampuses(token: string): Observable<unknown> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiUrl + '/v2/campus?arg1={page: {number: 2}}', {
      headers,
    });
  }

  logCampuses(): void {
    this.getCampuses(
      '0425cd1390be6803ce8e103cd1a953ea589f59c9fec026bca286496309215931',
    ).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error fetching token:', error);
      },
    });
  }
}
