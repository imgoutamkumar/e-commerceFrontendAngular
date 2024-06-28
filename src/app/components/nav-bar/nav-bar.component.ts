import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
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
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from '../auth/auth.component';
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
    NgbPopoverModule,
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
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isLoggedIn();
    // this.getCategoryData();
    this.getCategories();
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
    this.dialog.open(AuthComponent, { panelClass: 'my-custom-dialog' });
  }

  loggedIn: boolean = false;
  isLoggedIn() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
    }
  }
  logOut() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.setItem('token', '');
      this.loggedIn = false;
      this.isLoggedIn();
      this.route.navigate(['home']);
    } else {
      // Handle the case where localStorage is not available
      console.warn('localStorage is not supported');
    }
  }

  search() {
    this.route.navigate(['products'], {
      queryParams: {
        search: this.searchForm.value.search,
        page: 1,
        // category: this.catData,
      },
      queryParamsHandling: 'merge',
    });
  }
  categories: any;
  subCategories: any;
  subCategoriesItems: any;
  c: any;
  getCat() {
    const c = this.categoryService.getAllCategory();
  }
  getCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (result) => {
        const categoryData = result;
        this.categories = categoryData.map((item: any) => {
          return item.name;
        });
        console.log(this.categories);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSubCategories(category: string) {
    this.categoryService.getAllSubCategoryByCategory(category).subscribe({
      next: (result) => {
        const subCategoryData = result;
        this.subCategories = subCategoryData.map((item: any) => {
          return item.name;
        });
        console.log(this.subCategories);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSubCategoryItems(subCategory: string) {
    this.categoryService
      .getAllSubCategoryItemsBySubCategory(subCategory)
      .subscribe({
        next: (result) => {
          const subCategoryItemsData = result;
          this.subCategoriesItems = subCategoryItemsData.map((item: any) => {
            return item.name;
          });
          console.log(this.subCategoriesItems);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
