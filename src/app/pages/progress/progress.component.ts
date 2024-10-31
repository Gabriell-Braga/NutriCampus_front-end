import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  daysOfMonth: { day: number, weekDay: string }[] = [];
  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  selectedDay: number = 1;
  @ViewChild('days', { static: false}) days!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    this.generateDaysOfMonth(currentYear, currentMonth);
    this.selectedDay = today.getDate();

    console.log(this.days);
    let daysElement = this.days.nativeElement;
    daysElement.scrollTo({
      left: daysElement.scrollWidth * (this.selectedDay)/(this.daysOfMonth.length),
      behavior: 'auto'
    });
    console.log(this.daysOfMonth, this.selectedDay);
  }

  generateDaysOfMonth(year: number, month: number): void {
    const lastDay = new Date(year, month, 0).getDate();

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(year, month - 1, day);
      const weekDay = this.weekDays[currentDate.getDay()];
      this.daysOfMonth.push({ day, weekDay });
    }
  }
}
