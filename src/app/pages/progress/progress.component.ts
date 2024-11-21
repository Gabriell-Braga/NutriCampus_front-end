import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, AfterViewInit {

  daysOfMonth: { day: number, weekDay: string }[] = [];
  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  selectedDay: number = 1;
  selectedDate: string = '';
  almoco: any = {};
  jantar: any = {};
  openRefeicao: boolean = false;
  consumo:number = 0;
  percent: number = 0;
  userPopup: boolean = false;

  @ViewChild('days', { static: false}) days!: ElementRef;

  constructor(
    private authService: AuthService,
    private cardapioService: CardapioService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.showLoading();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    this.generateDaysOfMonth(currentYear, currentMonth);
    this.selectedDay = today.getDate();
    let todayString = today.toISOString().split('T')[0];
    this.selectedDate = todayString;

    this.cardapioService.getCardapioDia(this.authService.getCampus()!, todayString).subscribe(
      (cardapio: any) => {
        cardapio.forEach((element: any) => {
          if (element.refeicao === 'almoco') {
            this.almoco = element;
          } else {
            this.jantar = element;
          }
        });
      }
    );

    this.cardapioService.getConsumoHoje().subscribe(
      (consumo: any) => {
        this.saveConsumo(consumo);
        this.globalService.hideLoading();
      }
    );
  }

  changeUserPopup(){
    this.userPopup = !this.userPopup;
  }

  logout(){
    this.authService.logout();
  }


  ngAfterViewInit(): void {
    let daysElement = this.days.nativeElement;
    let daysParentElement = daysElement.parentElement;

    daysElement.scrollTo({
      left: (daysElement.scrollWidth * (this.selectedDay)/(this.daysOfMonth.length))-daysParentElement.clientWidth/2,
      behavior: 'auto'
    });
  }

  saveConsumo(consumo: any){
    let total = 0;
    for (const key in consumo) {
      if (consumo.hasOwnProperty(key)) {
        const prato = consumo[key];
        // Soma a quantidade do prato
        total += prato.quantidade || 0;

        // Soma a quantidade de cada alimento
        total += prato.alimentos.reduce((soma: number, alimento: any) => soma + (alimento.quantidade || 0), 0);
      }
    }

    this.consumo = total;

    this.percent = Math.min((this.consumo / this.getCaloriasIdeais()) * 100, 100);
  }

  getCaloriasIdeais(): number {
    return this.authService.getCaloriasIdeais();
  }

  generateDaysOfMonth(year: number, month: number): void {
    const lastDay = new Date(year, month, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(year, month - 1, day);
      const weekDay = this.weekDays[currentDate.getDay()];
      this.daysOfMonth.push({ day, weekDay });
    }
  }

  selectDay(day: number): void {
    this.globalService.showLoading();
    this.selectedDay = day;
    let today = new Date();
    today.setFullYear(today.getFullYear(), today.getMonth(), day);
    let todayString = today.toISOString().split('T')[0];
    this.selectedDate = todayString;

    this.almoco = {};
    this.jantar = {};

    this.cardapioService.getCardapioDia(this.authService.getCampus()!, todayString).subscribe(
      (cardapio: any) => {
        cardapio.forEach((element: any) => {
          if (element.refeicao === 'almoco') {
            this.almoco = element;
          } else {
            this.jantar = element;
          }
        });
      }
    );

    this.consumo = 0;
    if(this.isToday()){
      this.cardapioService.getConsumoHoje().subscribe(
        (consumo: any) => {
          this.saveConsumo(consumo);
          this.globalService.hideLoading();
        },
        (err: any) => {
          this.globalService.hideLoading();
        }
      );
    }else{
      this.cardapioService.getConsumoEspecifico({"data_inicio": todayString, "data_fim": todayString}).subscribe(
        (consumo: any) => {
          this.saveConsumo(consumo);
          this.globalService.hideLoading();
        },
        (err: any) => {
          this.globalService.hideLoading();
        }
      );
    }
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  isToday(){
    let today = new Date();
    return this.selectedDay == today.getDate();
  }
}
