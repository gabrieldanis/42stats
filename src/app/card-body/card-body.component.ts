import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-body',
  standalone: true,
  imports: [],
  template: `<article class="body-content"><ng-content></ng-content></article>`,
  styleUrl: './card-body.component.css',
})
export class CardBodyComponent {
  // @Input() body!: string;
}
