import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  senha: string = '';
  passwordFieldType: string = 'password';
  errors: string = '';

  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
  }

  clearInput(field: 'email') {
    this[field] = '';
  }

  togglePasswordVisibility(field: 'passwordFieldType') {
    this[field] = this[field] === 'password' ? 'text' : 'password';
  }

  login(){
    if(!this.email){
      this.errors = 'E-mail é obrigatório.';
    }else if(!this.senha){
      this.errors = 'Senha é obrigatória.';
    }else{
      this.errors = '';
      this.authService.login({email: this.email, senha: this.senha});
    }
  }
}
