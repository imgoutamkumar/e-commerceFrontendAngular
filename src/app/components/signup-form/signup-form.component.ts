import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  signUpForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SignupFormComponent>,
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  hide = true;
  signUp() {
    if (this.signUpForm.valid) {
      this.authService.logIn(this.signUpForm.value).subscribe({
        next: (val: any) => {
          localStorage.setItem('token', val.jwt);
          console.log('user authentication success');
          this.route.navigate(['home']);
          this.dialogRef.close();
        },
        error: (val: any) => {
          console.log('authentication denied');
        },
      });
    } else {
      console.log('must be a valid input');
    }
  }
}
