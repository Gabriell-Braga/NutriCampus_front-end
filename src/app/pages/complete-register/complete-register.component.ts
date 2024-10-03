import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  nome: string = '';
  genero: string = '';
  dataAniversario: string = '';
  altura: number | null = 160;
  peso: number | null = 117;
  frequencia: string = '';
  campus: string = '';

  etapa: number = 1;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clearInput(field: 'nome' | 'dataAniversario') {
    this[field] = '';
  }

  nextStep() {
    if(this.etapa < 8) {
      this.etapa++;
    }else if(this.etapa === 8) {
      this.router.navigate(['/progress']);
    }
  }

  selecionarGenero(genero: string) {
    this.genero = genero;
  }

  selecionarFrequencia(frequencia: string) {
    this.frequencia = frequencia;
  }
}
