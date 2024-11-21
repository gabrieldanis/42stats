import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fira-font">
      <!-- <a href="#" (click)="navigateHome()"> -->
      <a routerLink="">
        <img class="logo" src="/assets/42_Logo.svg" width="150px" />
      </a>
      <ul>
        <li>// browse through all of the school 42 campuses</li>
        <li>// search for login names</li>
        <li>// do something else, I don't know</li>
      </ul>
    </header>
    <router-outlet></router-outlet>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
