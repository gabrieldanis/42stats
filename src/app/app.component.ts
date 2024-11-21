import { Component, Signal, inject } from '@angular/core';
import { Tokendata } from './tokendata';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
  private authToken = inject(AuthTokenService);
  tokenSignal: Signal<Tokendata | undefined>;

  constructor() {
    this.tokenSignal = toSignal(
      this.authToken.fetchToken().pipe(
        tap((tokendata) => {
          this.authToken.setAccessToken(tokendata.access_token);
        }),
      ),
    );
  }
}
