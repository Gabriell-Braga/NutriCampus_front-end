import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-almoco',
  templateUrl: './almoco.component.html',
  styleUrls: ['./almoco.component.css']
})
export class AlmocoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cardapioService: CardapioService,
    private authService: AuthService
  ) { }

  data: string = '';
  almoco: any = {};
  addPopup: boolean = false;
  porcoes: number | null = 5;

  ngOnInit(): void {
    this.data = this.route.snapshot.paramMap.get('date')!;
    this.cardapioService.getCardapioDia(this.authService.getCampus()!, this.data).subscribe(
      (cardapio: any) => {
        cardapio.forEach((element: any) => {
          if (element.refeicao === 'almoco') {
            this.almoco = element;
          }
        });
      }
    );

    console.log(this.almoco);
  }

}
