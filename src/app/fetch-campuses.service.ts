import { Injectable, signal } from '@angular/core';
import { Campus } from './campus';

@Injectable({
  providedIn: 'root',
})
export class FetchCampusesService {
  campusPage: number = 2;
  constructor() {}

  allCampuses = signal<Campus[]>([]);
  private apiUrl = 'https://api.intra.42.fr';

  async getCampuses(token: string) {
    try {
      const response = await fetch(
        this.apiUrl + `/v2/campus?page=` + this.campusPage,
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
      this.allCampuses.set(await response.json());
      // console.log(this.allCampuses());
    } catch (error) {
      console.error(error);
    }
  }
}
