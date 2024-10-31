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

  getCardapioDia(campus: string, data: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get(this.global.getApiUrl() + 'cardapio-dia/' + campus + "/" + data).subscribe(
        (res: any) => {
          console.log(res);
          resolve(true);
        },
        err => {
          console.log(err);
          resolve(false);
        }
      );
    });
  }
  
  

}
