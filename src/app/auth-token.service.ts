import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tokendata } from './tokendata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private readonly uid =
    'u-s4t2ud-36d5e8f446dc7d9d5dbc017af3faf0582db3e85bc848695a7b621084331b6d35';
  private readonly secret =
    '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';
  private readonly apiUrl = 'https://api.intra.42.fr';

  http = inject(HttpClient);
  private accessToken: string | undefined = undefined;

  // get and set

  getAccessToken(): string | undefined {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  fetchToken(): Observable<Tokendata> {
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
}
