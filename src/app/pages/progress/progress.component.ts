import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardapioService } from 'src/app/services/cardapio/cardapio.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, AfterViewInit {

  daysOfMonth: { day: number, weekDay: string }[] = [];
  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  selectedDay: number = 1;
  almoco: any = {};
  jantar: any = {};
  openRefeicao: boolean = false;

  @ViewChild('days', { static: false}) days!: ElementRef;

  constructor(
    private authService: AuthService,
    private cardapioService: CardapioService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    this.generateDaysOfMonth(currentYear, currentMonth);
    this.selectedDay = today.getDate();
    let todayString = today.toISOString().split('T')[0];

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
  }

  ngAfterViewInit(): void {
    let daysElement = this.days.nativeElement;
    let daysParentElement = daysElement.parentElement;

    daysElement.scrollTo({
      left: (daysElement.scrollWidth * (this.selectedDay)/(this.daysOfMonth.length))-daysParentElement.clientWidth/2,
      behavior: 'auto'
    });
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
    this.selectedDay = day;
    let today = new Date();
    today.setFullYear(today.getFullYear(), today.getMonth(), day);
    let todayString = today.toISOString().split('T')[0];

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
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
