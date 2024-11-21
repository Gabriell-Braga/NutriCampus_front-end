import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {


  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  getCardapioDia(campus: string, data: string) {
    return this.http.get(this.global.getApiUrl() + 'cardapio-dia/' + campus + "/" + data);
  }

  getPratos(){
    return this.http.get(this.global.getApiUrl() + 'pratos/');
  }

  getConsumoHoje(){
    return this.http.get(this.global.getApiUrl() + 'refeicao/consumo/hoje');
  }

  getConsumoEspecifico(data: any){
    return this.http.get(this.global.getApiUrl() + 'refeicao/consumo', data);
  }

  postRefeicao(data: any){
    return this.http.post(this.global.getApiUrl() + 'refeicao/create', data);
  }
}
