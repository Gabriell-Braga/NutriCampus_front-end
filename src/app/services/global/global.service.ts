import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private api_url = 'https://nutricampus-api.azurewebsites.net/';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  getApiUrl() {
    return this.api_url;
  }

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideLoading() {
    this.loadingSubject.next(false);
  }
}
