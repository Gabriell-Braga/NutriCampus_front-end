import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private api_url = 'https://nutricampus-api.azurewebsites.net/';

  getApiUrl() {
    return this.api_url;
  }
}
