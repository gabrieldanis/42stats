import { Component } from '@angular/core';
import { Person } from '../person';
import { CardBodyComponent } from '../card-body/card-body.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardBodyComponent, CommonModule],
  template: `
    <article class="card">
      <section>
        <ng-content></ng-content>
        <a href="#" (click)="toggleBio()"
          ><img src="/plus.png" class="plus" />more info</a
        >
        <div class="cardbody" [style.max-height]="showBio ? '60px' : '0'">
          <ng-content select="app-card-body"></ng-content>
        </div>
      </section>
    </article>
  `,
  styleUrl: './card.component.css',
})
export class CardComponent {
  // @Input() person!: Person;
  toggleBio(): void {
    this.showBio = !this.showBio;
  }

  showBio: boolean = false;
}
