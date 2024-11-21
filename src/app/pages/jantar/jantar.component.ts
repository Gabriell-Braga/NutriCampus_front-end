import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-jantar',
  templateUrl: './jantar.component.html',
  styleUrls: ['./jantar.component.css']
})
export class JantarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardapioService: CardapioService,
    private authService: AuthService,
    private globalService: GlobalService
  ) { }

  data: string = '';
  jantar: any = {};
  pratos: any = [];
  addPopup: boolean = false;
  porcoes: number | null = 5;
  comidaSelecionada: string | null = null;

  ingredientes: any = [];

  campos = [ "prato_principal",  "prato_veg", "arroz_principal",  "arroz_secundario", "feijao_principal",  "guarnicao", "salada"];

  ngOnInit(): void {
    this.globalService.showLoading();
    this.data = this.route.snapshot.paramMap.get('date')!;
    this.cardapioService.getCardapioDia(this.authService.getCampus()!, this.data).subscribe(
      (cardapio: any) => {
        cardapio.forEach((element: any) => {
          if (element.refeicao === 'jantar') {
            this.jantar = element;
          }
        });
      }
    );

    this.cardapioService.getPratos().subscribe(
      (pratos: any) => {
        this.pratos = pratos;
        this.globalService.hideLoading();
      }
    );
  }

  back(): void {
    this.router.navigate(['/progress']);
  }

  openAddPopup(comidaSelecionada: string): void {
    this.addPopup = true;
    this.comidaSelecionada = comidaSelecionada;

    if (this.isPorcaoPushed(comidaSelecionada)) {
      this.porcoes = this.getQntd(comidaSelecionada) / 100;
    }
  }

  closeAddPopup(): void {
    this.porcoes = 5;
    this.addPopup = false;
    this.comidaSelecionada = null;
  }

  getQntdTotal(){
    let qntd = 0;

    this.ingredientes.forEach((ingrediente: any) => {
      qntd += ingrediente.quantidade;
    });

    return qntd;
  }

  getQntd(name: string): number {
    let qntd = 0;

    this.ingredientes.forEach((ingrediente: any) => {
      if (ingrediente.nome_prato === name) {
        qntd = ingrediente.quantidade;
      }
    });

    return qntd;
  }

  isPorcaoPushed(name: string): boolean {
    return this.ingredientes.some((ingrediente: any) => {
      if (ingrediente.nome_prato === name) {
        return true;
      }
      return false;
    });
  }


  submitPorcao(): void {
    let idPrato = 0;

    if(!this.isPorcaoPushed(this.comidaSelecionada!)) {

      this.pratos.forEach((prato: any) => {
        if (prato.nome_prato === this.comidaSelecionada) {
          idPrato = prato.id_prato;
        }
      });

      this.ingredientes.push({
        nome_prato: this.comidaSelecionada,
        id_prato: idPrato,
        quantidade: this.porcoes! * 100
      });
    }else{
      this.ingredientes.forEach((ingrediente: any) => {
        if (ingrediente.nome_prato === this.comidaSelecionada) {
          ingrediente.quantidade = this.porcoes! * 100;
        }
      });
    }

    this.closeAddPopup();
  }

  confirmar() {
    this.globalService.showLoading();
    this.ingredientes = this.ingredientes.map((ingrediente: { nome_prato: string; [key: string]: any }) => {
      const { nome_prato, ...resto } = ingrediente;
      return resto;
    });

    const data = {
      "tipo_refeicao": "jantar",
      "pratos": this.ingredientes
    };

    this.cardapioService.postRefeicao(data).subscribe(
      (response: any) => {
        this.router.navigate(['/progress']);
        this.globalService.hideLoading();
      },
      (error: any) => {
        console.log(error);
        this.globalService.hideLoading();
      }
    );
  }



}
