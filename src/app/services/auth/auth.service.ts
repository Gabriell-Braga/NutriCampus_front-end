import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  register(data: any) {
    return this.http.post(this.global.getApiUrl() + 'auth/signup', data);
  }

  login(data: any) {
    return this.http.post(this.global.getApiUrl() + 'auth/signin', data);
  }

  me() {
    return this.http.get(this.global.getApiUrl() + 'me');
  }
}
