import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class RefeicoesService {
    constructor(
      private http: HttpClient,
      private global: GlobalService
    ) { }

    createRefeicao(data: any): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.post(this.global.getApiUrl() + 'refeicao/create', data).subscribe(
          (res: any) => {
            resolve(true);
          },
          err => {
            console.error('Erro ao criar refeição:', err);
            reject(false);
          }
        );
      });
    }
}
