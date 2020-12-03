import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MuseumComponent } from './components/museum/museum.component';
import { SignupComponent } from './components/signup/signup.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { CuratorComponent } from './components/curator/curator.component';
import { UpdateArtifactComponent } from './components/update-artifact/update-artifact.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'museum', component: MuseumComponent },
  { path: 'favourites', component: FavouriteComponent },
  { path: 'curator', component: CuratorComponent },
  { path: 'update/:id', component: UpdateArtifactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
