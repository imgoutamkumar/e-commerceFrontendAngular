import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import { ProductService } from '../../services/product.service';

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
export class NavBarComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
    console.log('afterViewInit called');
  }

  ngOnInit(): void {
    this.isLoggedIn();
    // this.getCategoryData();
  }

  /* catData: string = '';
  getCategoryData() {
    this.productService.getCategoryData().subscribe({
      next: (value: any) => {
        this.catData = value;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  } */

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
    this.route.navigate(['products'], {
      queryParams: {
        search: this.searchForm.value.search,
        // category: this.catData,
      },
    });
  }
}
