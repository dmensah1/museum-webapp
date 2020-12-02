import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	localId: string;
	expiresIn: string;
	registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();
    private token: string;
	private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    getIsAuth() {
		return this.isAuthenticated;
	}

	getToken() {
		return this.token;
	}

	getAuthStatusListener() {
		return this.authStatusListener.asObservable();
    }
    
    // Sign up as new user
	signup(email: string, password: string, name: string) {
		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, 
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			const token = response.idToken
			this.token = token;
            
            this.createUser(name, email, password);
			this.login(email, password);
		});
    }
    
	// Login User
	login(email, password) {
		this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			const token = response.idToken
			this.token = token;

			if (token) {

                const expirationTime = +response.expiresIn;
                this.setAuthTimer(expirationTime);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expirationTime * 1000);
                this.saveAuthData(response.localId, response.idToken, expirationDate, response.email);
                this.router.navigate(['/']);
			}
		});
    }

    logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate(['/login']);
	}

	// ***DOESNT WORK*** to create the user in mysql db 
	createUser(name: string, email: string, password: string) {
		this.http.post("http://localhost:3000/addVisitor", {name: name, email:email, password: password}).subscribe(resp => {
		});
	}
    

    // saves the currently logged in user info into local storage to keep user logged in upon page refresh
  	private saveAuthData(id: string, token: string, expirationTimer: Date, email: string) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationTimer.toISOString());
        localStorage.setItem('email', email);
    }
    
    // sets the timer to automatically log out a user
    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration)
        this.tokenTimer = setTimeout(() => {
        this.logout();
        }, duration * 1000);
    }
    
    // clears user data from local storage
    private clearAuthData() {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('email');
    }

    // automatically authenticate logged in user if page is refreshed
	autoAuthUser() {
		const authInformation = this.getAuthData();
		if (!authInformation) { return; }
		const now = new Date();
		const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
		console.log(expiresIn)
		if (expiresIn > 0) {
		  this.token = authInformation.token;
		  this.isAuthenticated = true;
		  this.setAuthTimer(expiresIn / 1000);
		  this.authStatusListener.next(true);
		}
	}

	// returns the information about the logged in user form local storage
	private getAuthData() {
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expiration');
		if (!token && !expirationDate) { return; }
		return {	
		  token: token,
		  expirationDate: new Date(expirationDate),
		};
	}

}