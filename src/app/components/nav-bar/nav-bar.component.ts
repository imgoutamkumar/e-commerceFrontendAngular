import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.isLoggedIn();
  }

  openLoginFormDialog(): void {
    this.dialog.open(LoginFormComponent, { panelClass: 'my-custom-dialog' });
  }

  loggedIn: boolean = false;
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
  }
  logOut() {
    localStorage.setItem('token', '');
    this.loggedIn = false;
    this.isLoggedIn();
    this.route.navigate(['home']);
  }
  search() {
    console.log(this.searchForm.value.search);
    this.route.navigate(['products'], {
      queryParams: { search: this.searchForm.value.search },
    });
  }
}
