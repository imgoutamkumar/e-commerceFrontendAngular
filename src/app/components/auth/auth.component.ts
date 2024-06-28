import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [LoginFormComponent, SignupFormComponent],
})
export class AuthComponent {
  constructor() {}
  @ViewChild('form') form!: ElementRef;
  SignUp() {
    console.log('sign up clicked');
    this.form.nativeElement.classList.add('active');
  }
  SignIn() {
    console.log('sign in clicked');
    this.form.nativeElement.classList.remove('active');
  }
}
