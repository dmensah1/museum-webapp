import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
    fname : string;
	lname : string;
	email : string;
	password : string;
    passwordConfirm : string;
    
    statusDisplay: any;  // Bool for activating status message
	statusAnimation: any;  // String for activating animation of status message
    statusText: any;  // Text inside of status message
    
    constructor(private authService: AuthService) {}


	async onSubmit(signupForm) {
		this.email = signupForm.value.email;
		this.password = signupForm.value.password;
		this.fname = signupForm.value.fname;
		this.lname = signupForm.value.lname;
		let fullName = this.fname + " " + this.lname;
        
		if (this.validateName(this.fname, this.lname) == false){
			this.activateStatusMessage();
		}
		else if (this.validateEmail(this.email) == false){
			
			this.activateStatusMessage();
		}
		else if (this.validatePassword(this.password) == false){
			this.activateStatusMessage();
		}
		else {
            this.authService.signup(this.email, this.password, fullName);
		}
	}

	// Validates the name
	validateName(fname, lname){
		if (!fname || !lname){
			this.statusText = 'Please enter your name';
			return false;
		}
		else {
			return true;
		}
	}

	// Validates the email
	validateEmail(email) {
		if (!email){
			this.statusText = 'Please enter a valid email';
			return false;
		}
		else if (email.includes("@") && email.includes(".") && email.length < 9) {
			this.statusText = 'Please enter a valid email';
			return false;
		}
		else {
			return true;
		}
	}

	// Validates the password
	validatePassword(password){
		if (!password){
			this.statusText = "Please enter your password"
			return false;
		}
		else if (password.length < 8) {
			this.statusText = "Password must be at least 8 character long"
			return false;
		}
		else if (password != this.passwordConfirm){
			this.statusText = "Passwords do not match"
			return false;
		}
		else {
			return true;
		}
	}

	// Activates the error pop up bubble
	activateStatusMessage() {
		this.statusDisplay = true;
		this.statusAnimation = "auto";
		setTimeout(() => {
			this.statusAnimation = "";
		}, 100);
	}
} 