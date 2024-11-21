import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private caloriasIdeiais: number = 0;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  register(data: any): Promise<boolean> {
    this.global.showLoading();
    return new Promise((resolve) => {
      this.http.post(this.global.getApiUrl() + 'auth/signup', data).subscribe(
        (res: any) => {
          this.global.hideLoading();
          this.setAccessToken(res.access_token);
          this.router.navigate(['/progress']);
        },
        err => {
          this.global.hideLoading();
          console.log(err);
          resolve(false);
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

          this.caloriasIdeiais = this.calcularCalorias(
            res.data_nascimento,
            res.peso,
            res.altura,
            res.atividade,
            res.sexo
          );

          resolve(true);
        },
        err => {
          resolve(false);
          this.logout();
        }
      );
    });
  }

  getCaloriasIdeais(): number {
    return this.caloriasIdeiais;
  }

  // Método para calcular calorias ideais
  calcularCalorias(dataNascimento: string, peso: number, altura: number, atividade: number, sexo: string): number {
    const idade = this.calcularIdade(dataNascimento);

    // Fórmula de Harris-Benedict
    let tmb;
    if (sexo === 'm') {
      tmb = 10 * peso + 6.25 * altura - 5 * idade + 5; // Homens
    } else {
      tmb = 10 * peso + 6.25 * altura - 5 * idade - 161; // Mulheres
    }

    // Multiplicadores de atividade
    const multiplicadores: { [key: number]: number } = {
      1: 1.2, // Sedentário
      2: 1.375, // Levemente ativo
      3: 1.55, // Moderadamente ativo
      4: 1.725, // Muito ativo
      5: 1.9 // Extremamente ativo
    };

    const fatorAtividade = multiplicadores[atividade] || 1.2; // Padrão para sedentário
    return tmb * fatorAtividade;
  }

  // Método auxiliar para calcular a idade
  calcularIdade(dataNascimento: string): number {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
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
