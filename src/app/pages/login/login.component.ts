import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  senha: string = '';
  passwordFieldType: string = 'password';

  constructor() { }

  ngOnInit(): void {
  }

  clearInput(field: 'email') {
    this[field] = ''; // Acessa o campo do componente dinamicamente
  }

  togglePasswordVisibility(field: 'passwordFieldType') {
    this[field] = this[field] === 'password' ? 'text' : 'password';
  }
}
