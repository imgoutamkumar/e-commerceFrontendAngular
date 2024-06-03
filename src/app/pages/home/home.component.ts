import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCarouselComponent } from '../../components/main-carousel/main-carousel.component';
import { ProductSliderComponent } from '../../components/product-slider/product-slider.component';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    MainCarouselComponent,
    ProductSliderComponent,
    CategoryCardComponent,
    ProductCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, OnChanges {
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getWomenTrendingProduct();
    this.getMenTrendingProduct();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  womensTrendingProduct: any;
  mensTrendingProduct: any;

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
  /* addToWishlist(e: Event) {
      console.log(e);
    this.wishlistService.addToWishlist(e.toString()).subscribe({
      next: (result: any) => {
        console.log('message:', result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  } */

  brands = [
    'Nike',
    'Adidas',
    'Puma',
    'Zara',
    'Levis',
    'Peter England',
    'Jockey',
  ];
}
