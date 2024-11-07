import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CompleteRegisterComponent } from './pages/complete-register/complete-register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AlmocoComponent } from './pages/almoco/almoco.component';
import { JantarComponent } from './pages/jantar/jantar.component';

const routes: Routes = [
  { path: '',                   component: HomeComponent },
  { path: 'register',           component: RegisterComponent },
  { path: 'login',              component: LoginComponent },
  { path: 'complete-register',  component: CompleteRegisterComponent},
  { path: 'progress',           component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'almoco/:date',       component: AlmocoComponent, canActivate: [AuthGuard] },
  { path: 'jantar/:date',       component: JantarComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
