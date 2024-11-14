import { Injectable, signal } from '@angular/core';
import { Campus } from './campus';

@Injectable({
  providedIn: 'root',
})
export class FetchCampusesService {
  campusPage: number = 1;
  constructor() {}

  allCampuses: Campus[] = [];
  currentCampuses: Campus[] = [];
  private apiUrl = 'https://api.intra.42.fr';

  async getCampuses(token: string) {
    while (true) {
      try {
        const response = await fetch(
          this.apiUrl + `/v2/campus?page=${this.campusPage}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error fetching campuses: ${response.statusText}`);
        }
        this.currentCampuses = await response.json();
        console.log(this.currentCampuses);
        this.allCampuses = this.allCampuses.concat(this.currentCampuses);
        await new Promise((r) => setTimeout(r, 1000));
        this.campusPage += 1;
        if (!this.currentCampuses.length) {
          return;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }
  }
}
