import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  logInForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  hide = true;
  signin() {
    if (this.logInForm.valid) {
      this.authService.logIn(this.logInForm.value).subscribe({
        next: (val: any) => {
          localStorage.setItem('token', val.jwt);
          console.log('user authentication success');
          this.route.navigate(['home']);
          this.dialogRef.close();
          // if (val.role === 'admin') {
          //   console.log('admin authentication success');
          // }
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
