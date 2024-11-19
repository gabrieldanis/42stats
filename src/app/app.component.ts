import { Component, Signal, inject } from '@angular/core';
import { Tokendata } from './tokendata';
import { CommonModule } from '@angular/common';
import { ApidataService } from './apidata.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CampusesComponent } from './campuses/campuses.component';
import { HomeComponent } from './home/home.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CampusesComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'card';
  private apiDataService = inject(ApidataService);
  tokenSignal: Signal<Tokendata | undefined>;

  constructor() {
    this.tokenSignal = toSignal(this.apiDataService.fetchToken());
  }
  // users = computed(() => {
  //   const token = this.tokenSignal();
  //   if (token) {
  //     return this.apiDataService.fetchUsers(token.access_token);
  //   }
  //   return undefined;
  // });

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
