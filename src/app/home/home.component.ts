import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- <a [routerLink]="['campuses', token()]">link to campus </a> -->
    <router-outlet></router-outlet>
  `,
  styleUrl: './home.component.css',
})
// export class HomeComponent implements OnInit {
export class HomeComponent implements OnInit {
  token = input.required<string>();
  private router = inject(Router);

  ngOnInit() {
    const token = this.token();
    this.router.navigate(['campuses'], { queryParams: { token } });
  }
}
