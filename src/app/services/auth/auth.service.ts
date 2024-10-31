import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  register(data: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.post(this.global.getApiUrl() + 'auth/signup', data).subscribe(
        (res: any) => {
          this.setAccessToken(res.access_token);
          this.router.navigate(['/progress']);
        },
        err => {
          resolve(false);
          console.log(err);
        }
      );
    });
  }

  login(data: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.post(this.global.getApiUrl() + 'auth/signin', data).subscribe(
        (res: any) => {
          this.setAccessToken(res.access_token);
          this.router.navigate(['/progress']);
        },
        err => {
          console.log(err);
          resolve(false);
        }
      );
    });
  }

  me(): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get(this.global.getApiUrl() + 'auth/me').subscribe(
        (res: any) => {
          this.setNome(res.nome);
          this.setCampus(res.campus);
          resolve(true);
        },
        err => {
          resolve(false);
          this.logout();
        }
      );
    });
  }

  logout(){
    this.removeLocalStorage();
    this.router.navigate(['/login']);
  }

  removeLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('nome');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  getNome(){
    return localStorage.getItem('nome');
  }

  getCampus(){
    return localStorage.getItem('campus');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  setNome(nome: string) {
    localStorage.setItem('nome', nome);
  }

  setCampus(campus: string) {
    localStorage.setItem('campus', campus);
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }
}
