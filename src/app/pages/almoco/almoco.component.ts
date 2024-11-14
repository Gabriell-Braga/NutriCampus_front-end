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
  pratos: any = [];
  addPopup: boolean = false;
  porcoes: number | null = 5;
  comidaSelecionada: string | null = null;

  ingredientes: any = [];

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

    this.cardapioService.getPratos().subscribe(
      (pratos: any) => {
        this.pratos = pratos;
      }
    );

    console.log(this.almoco);
  }

  openAddPopup(comidaSelecionada: string): void {
    this.addPopup = true;
    this.comidaSelecionada = comidaSelecionada;
  }

  closeAddPopup(): void {
    this.porcoes = 5;
    this.addPopup = false;
    this.comidaSelecionada = null;
  }

  submitPorcao(): void {
    let idPrato = 0;

    this.pratos.forEach((prato: any) => {
      console.log(prato.nome_prato);
      if (prato.nome_prato === this.comidaSelecionada) {
        idPrato = prato.id;
        console.log(idPrato);
      }
    });

    this.ingredientes.push({
      id_prato: idPrato,
      quantidade: this.porcoes
    });

    console.log(this.ingredientes);

    this.closeAddPopup();
  }
}
