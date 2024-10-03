import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CompleteRegisterComponent } from './pages/complete-register/complete-register.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [
  { path: '',                   component: HomeComponent },
  { path: 'register',           component: RegisterComponent },
  { path: 'login',              component: LoginComponent },
  { path: 'complete-register',  component: CompleteRegisterComponent},
  { path: 'progress',           component: ProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
