import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  senha: string = '';
  senhaConfirmacao: string = '';
  passwordFieldType: string = 'password';
  passwordConfirmFieldType: string = 'password';

  errors: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clearInput(field: 'email') {
    this[field] = '';
  }

  togglePasswordVisibility(field: 'passwordFieldType' | 'passwordConfirmFieldType') {
    this[field] = this[field] === 'password' ? 'text' : 'password';
  }

  register() {
    const errors = [];

    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('E-mail inválido.');
    } else if (!this.senha || this.senha.length < 8) {
      errors.push('A senha deve ter no mínimo 8 caracteres.');
    } else if (this.senha !== this.senhaConfirmacao) {
      errors.push('As senhas não coincidem.');
    }

    if (errors.length) {
      this.errors = errors.join(' ');
    } else {
      this.errors = '';
      this.router.navigate(['/complete-register'], {
        state: { email: this.email, senha: this.senha }
      });
    }
  }
  
}
