import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  email: string = '';
  senha: string = '';
  nome: string = '';
  genero: string = '';
  dataAniversario: string = '';
  altura: number | null = 160;
  peso: number | null = 117;
  frequencia: number = 0;
  campus: string = '';

  etapa: number = 1;
  errors: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    const state = history.state;
    this.email = state?.email;
    this.senha = state?.senha;
    if (!this.email || !this.senha) {
      this.router.navigate(['/register']);
    }
  }

  clearInput(field: 'nome' | 'dataAniversario') {
    this[field] = '';
  }

  nextStep() {
    switch(this.etapa) {
      case 1:
        if(!this.nome) {
          this.errors = 'Nome é obrigatório.';
        }else if(this.nome.length < 3) {
          this.errors = 'Nome deve ter no mínimo 3 caracteres.';
        }else{
          this.errors = '';
          this.etapa++;
        }
        break;

      case 2:
        if(!this.genero) {
          this.errors = 'Escolha um gênero.';
        }else{
          this.errors = '';
          this.etapa++;
        }
        break;

      case 3:
        if (!this.dataAniversario) {
          this.errors = 'Data de aniversário é obrigatória.';
          break;
        }

        const dataAniversario = new Date(this.dataAniversario);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataAniversario.getFullYear();
        const isMenorDe18 = idade < 18 || (idade === 18 && hoje < new Date(hoje.getFullYear(), dataAniversario.getMonth(), dataAniversario.getDate()));

        if (dataAniversario > hoje) {
          this.errors = 'Data de aniversário não pode ser no futuro.';
        } else if (isMenorDe18) {
          this.errors = 'Você deve ter no mínimo 18 anos.';
        } else {
          this.errors = '';
          this.etapa++;
        }
        break;

      case 4:
          this.errors = '';
          this.etapa++;
        break;

      case 5:
          this.errors = '';
          this.etapa++;
        break;

      case 6:
        if(this.frequencia == 0){
          this.errors = 'Escolha uma frequência.';
        }else{
          this.errors = '';
          this.etapa++;
        }
        break;

      case 7:
        if(!this.campus){
          this.errors = 'Escolha um campus.';
        }else{
          this.errors = '';
          this.etapa++;
        }
        break;

      case 8:
        this.errors = '';
        let data = {
          email: this.email,
          senha: this.senha,
          nome: this.nome,
          sexo: this.genero,
          data_nascimento: this.dataAniversario,
          altura: this.altura,
          peso: this.peso,
          atividade: this.frequencia,
          campus: this.campus
        }

        this.authService.register(data);
        break;
    }
  }

  selecionarGenero(genero: string) {
    this.genero = genero;
  }

  selecionarFrequencia(frequencia: number) {
    this.frequencia = frequencia;
  }
}
