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
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
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
    MatGridListModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, OnChanges {
  constructor(
    private route: Router,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.getWomenTrendingProduct();
    this.getMenTrendingProduct();
    this.getWomenProductByCategoryAndRating();
    this.getMenProductByCategoryAndRating();
  }
  ngOnChanges(changes: SimpleChanges): void {}

  brand: string = 'Biba';
  getOfferProducts(tileData: any) {
    console.log('tileData emited:', tileData);
    this.route.navigate(['products'], {
      queryParams: {
        brand: tileData.brand,
        page: 1,
        // category: this.catData,
      },
      queryParamsHandling: 'merge',
    });
  }

  womensTrendingProduct: any;
  mensTrendingProduct: any;
  womenProduct: any;
  getWomenProductByCategoryAndRating() {
    this.productService.getProductByCategoryAndRating('Women', 3.5).subscribe({
      next: (result: any) => {
        console.log('result :', result);
        this.womenProduct = result;
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }
  getMenProductByCategoryAndRating() {
    this.productService.getProductByCategoryAndRating('Men', 3.5).subscribe({
      next: (result: any) => {
        console.log('result :', result);
        this.womenProduct = result;
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }
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

  womensOffer: any = [
    {
      text: 'https://www.biba.in/on/demandware.static/-/Library-Sites-BibaSharedLibrary/en_IN/dw5faa5043/new_upload/mid-banner/rb-may21-dom.jpg',
      cols: 2,
      rows: 3,
      color: 'lightblue',
      brand: 'Biba',
    },
    {
      text: 'https://i.pinimg.com/originals/62/7a/de/627ade4b3389532afa83b2e82d70210b.jpg',
      cols: 1,
      rows: 2,
      color: 'lightpink',
      brand: 'Berrylush',
    },
    {
      text: 'https://i.pinimg.com/originals/89/b6/d5/89b6d53b5876f2aac4af1ee02d5916a0.gif',
      cols: 1,
      rows: 5,
      color: '#DDBDF1',
      brand: 'Biba',
    },

    {
      text: '//www.berrylush.com/cdn/shop/files/Web_banner_mobile_2_1.jpg?v=1717655521',
      cols: 1,
      rows: 3,
      color: 'lightpink',
      brand: 'Berrylush',
    },
    {
      text: '//www.rareism.com/cdn/shop/files/WEB_COLLECTION_BANNERS_linen_upto_50.jpg?v=1716812909',
      cols: 2,
      rows: 2,
      color: 'lightgreen',
      brand: 'Berrylush',
    },
  ];
  mensOffer: Tile[] = [
    {
      text: 'https://i.pinimg.com/originals/b5/48/66/b54866bea76447d18bcee45015538f70.jpg',
      cols: 2,
      rows: 3,
      color: 'lightblue',
    },
    {
      text: 'https://i.pinimg.com/originals/55/ac/4f/55ac4f1f40438cd4cc77b33f23652d6a.jpg',
      cols: 1,
      rows: 2,
      color: 'lightpink',
    },
    {
      text: 'https://i.pinimg.com/originals/11/4d/46/114d46dd7a1d7632f05fb4ae0ca52f42.gif',
      cols: 1,
      rows: 5,
      color: '#DDBDF1',
    },

    {
      text: 'https://i.pinimg.com/originals/91/26/8d/91268d65a6fd0a2889c5e9fd7cded962.jpg',
      cols: 1,
      rows: 3,
      color: 'lightgreen',
    },
    {
      text: 'https://i.pinimg.com/originals/7a/e9/c2/7ae9c2c1b08863cdf8ba0114f6521dfd.jpg',
      cols: 2,
      rows: 2,
      color: 'lightgreen',
    },
  ];
}
