import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private api_url = 'https://nutricampus-api.onrender.com/';

  getApiUrl() {
    return this.api_url;
  }
}
