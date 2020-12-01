import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD

const routes: Routes = [
  { path: 'login', component: LoginComponent }
=======
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './components/user/user.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
<<<<<<< HEAD
>>>>>>> parent of 0595c23... Final touches
=======
>>>>>>> parent of 0595c23... Final touches
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
