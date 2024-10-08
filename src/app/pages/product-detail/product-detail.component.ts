import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductSliderComponent } from '../../components/product-slider/product-slider.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [
    CommonModule,
    MatGridListModule,
    ProductSliderComponent,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    HammerModule,
    ProductCardComponent,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  cartFormGroup: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.cartFormGroup = this.fb.group({
      quantity: 1,
      size: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.getWomenTrendingProduct();
  }

  openSnackBar() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      duration: 1 * 1000,
    });
  }

  product: any;
  getProductDetails() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        console.log(value.get('id'));
        this.productService.getProductById(value.get('id')).subscribe({
          next: (result: any) => {
            console.log(result);
            this.product = result;
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

  /* quantity = 1;
  size = ''; */
  cartData = {
    productId: '',
    quantity: 1,
    size: '',
  };

  addItemToCart() {
    console.log('cart button clicked');
    if (this.cartFormGroup.valid) {
      console.log(this.cartFormGroup.value);
      this.activatedRoute.paramMap.subscribe({
        next: (value: any) => {
          const { quantity, size } = this.cartFormGroup.value;
          this.cartData.productId = value.get('id').toString();
          this.cartData.quantity = parseInt(quantity);
          this.cartData.size = size;
          console.log('this.cartData', this.cartData);
          this.cartService.addToCart(this.cartData).subscribe({
            next: (result: any) => {
              console.log(result);
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
  }

  addItemToWishlist() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        this.wishlistService.addToWishlist(value.get('id')).subscribe({
          next: (result: any) => {
            this.openSnackBar();
            console.log('message:', result);
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

  selectedIndex = 0;
  showPrevious(i: number) {
    console.log('i:', i);
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }
  showNext(i: number) {
    if (this.selectedIndex < this.product.images?.length - 1) {
      this.selectedIndex = i + 1;
    }
  }

  womensTrendingProduct: any;

  getWomenTrendingProduct() {
    this.productService.getProductFromCategory('Women').subscribe({
      next: (result: any) => {
        this.womensTrendingProduct = result;
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }
}
