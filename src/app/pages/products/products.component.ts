import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ProductCardComponent,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  toppings = this.fb.group({
    men: false,
    women: false,
    kids: false,
  });

  ngOnInit(): void {
    this.getMenTrendingProduct();
    this.getSearchedAndFilteredData();
  }
  queryData = {
    search: '',
    page: '',
    category: '',
    limit: '',
  };
  searchedAndFilteredProducts: any;
  getSearchedAndFilteredData() {
    this.activatedRoute.queryParams.subscribe({
      next: (value: any) => {
        console.log('search :', value.search);
        this.queryData.search = value.search;
        this.productService.searchAndFilteredProduct(this.queryData).subscribe({
          next: (result: any) => {
            console.log('search result:', result);
            this.searchedAndFilteredProducts = result;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  mensTrendingProduct: any;

  getMenTrendingProduct() {
    this.productService.getProductFromCategory('Men').subscribe({
      next: (result: any) => {
        this.mensTrendingProduct = result;
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }

  addToWishlist(e: Event) {
    console.log(e);
    this.wishlistService.addToWishlist(e.toString()).subscribe({
      next: (result: any) => {
        console.log('message:', result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
