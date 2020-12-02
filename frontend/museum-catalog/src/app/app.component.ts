import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'museum-catalog';
  menuOptions = ["Favorites", "My Tickets"];

  isAuthenticated = false;
  private isAuthListenerSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.isAuthListenerSub = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }


  login() {
    
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthListenerSub.unsubscribe();
  }
}
