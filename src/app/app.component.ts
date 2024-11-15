import { Component, Signal, signal, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { Tokendata } from './tokendata';
import { User } from './user';
import { Campus } from './campus';
import { CardBodyComponent } from './card-body/card-body.component';
import { CommonModule } from '@angular/common';
import { ApidataService } from './apidata.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    CardComponent,
    CardBodyComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'card';

  private apiDataService = inject(ApidataService);

  // Signals
  isLoading = signal(true);
  apiToken = signal<string | null>(null);
  users = signal<User[]>([]);

  constructor() {
    const apiTokenSignal = toSignal(this.apiDataService.fetchToken(), {
      initialValue: null,
    });

    effect(
      () => {
        const token = apiTokenSignal();
        if (token) {
          this.apiToken.set(token.access_token);
          // this.loadUsers(token.access_token);
        }
      },
      { allowSignalWrites: true },
    );
  }

  // private loadUsers(apiToken: string) {
  //   const usersSignal = toSignal(this.apiDataService.fetchUsers(apiToken), {
  //     initialValue: [],
  //   });
  //   effect(() => {
  //     const userList = usersSignal();
  //     if (userList.length > 0) {
  //       this.users.set(userList);
  //       this.isLoading.set(false);
  //     }
  //   });
  // }
}
