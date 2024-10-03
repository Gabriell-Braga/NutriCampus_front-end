import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  clearInput(field: 'email') {
    this[field] = '';
  }

  togglePasswordVisibility(field: 'passwordFieldType' | 'passwordConfirmFieldType') {
    this[field] = this[field] === 'password' ? 'text' : 'password';
  }
}
