import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { Tokendata } from './tokendata';
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

  // people: Person[] = [
  //   { id: 0, name: 'Marco Rondon', coalition: 'totoro', bio: 'from Venezuela' },
  //   { id: 1, name: 'Filip Sekula', coalition: 'chocobo', bio: 'from Croatia' },
  // ];

  tokenSignal: Signal<Tokendata | undefined>;

  constructor(public apiDataService: ApidataService) {
    console.log('hi');
    this.tokenSignal = toSignal(apiDataService.getTokenObservable());
  }
}
