import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { ActivatedRoute, withComponentInputBinding } from '@angular/router';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatRadioModule,
    NgbPaginationModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnChanges, DoCheck {
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  page = 1;
  totalPage: any;
  categories: string[] = ['Men', 'Women', 'Girls', 'Boys'];
  brands: string[] = [
    'Biba',
    'Amrutam Fab',
    'Anouk',
    'KALINI',
    'Berrylush',
    'BULLMER',
    'Miss Chase',
    'The Souled Store',
    'Roadster',
    'Louis Philippe',
    'Raymond',
    'Mast & Harbour',
    'HIGHLANDER',
    'HERE&NOW',
    'Manyavar Mohey',
    'Urbanic',
    'adidas',
    'KISAH',
    'Sangria',
    'Chemistry',
    'Tokyo Talkies',
    'urbanic',
    'House of Pataudi',
    'SASSAFRAS',
    'Khushal K',
    'ASPORA',
  ];

  ngOnInit(): void {
    //called once after constructor get called
    this.getMenTrendingProduct();
    this.getSearchedAndFilteredData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //only worked for change in input or output decorator
    console.log('ngOnChanges called');
  }
  ngDoCheck(): void {
    //every change in life cycle ngDoCheck called
    console.log('ngDoCheck called');
  }
  queryData = {
    search: '',
    page: 1,
    category: '',
    limit: '',
    brand: '',
  };
  cat: string = '';
  onChange(cat: string) {
    this.cat = cat;
    //this.productService.setCategoryData(cat);
    this.getSearchedAndFilteredData();
  }
  selectedCheckBoxValue: any;
  selectedCheckBoxSet = new Set();
  onCheckboxChange(checkbox: MatCheckboxChange) {
    if (checkbox.checked === true) {
      this.selectedCheckBoxSet.add(checkbox.source.value);
    }
    if (checkbox.checked === false) {
      this.selectedCheckBoxSet.delete(checkbox.source.value);
    }
    console.log(this.selectedCheckBoxSet);
    this.getSearchedAndFilteredData();
  }

  searchedAndFilteredProducts: any;
  getSearchedAndFilteredData() {
    this.activatedRoute.queryParams.subscribe({
      next: (value: any) => {
        this.selectedCheckBoxValue = [...this.selectedCheckBoxSet];
        console.log('queryValue', value);
        this.queryData.search = value.search;
        this.queryData.category = this.cat;
        this.queryData.brand = this.selectedCheckBoxValue;
        this.queryData.page = this.page;
        this.productService.searchAndFilteredProduct(this.queryData).subscribe({
          next: (result: any) => {
            console.log(result);
            this.totalPage = result.productCount * 10;
            this.searchedAndFilteredProducts = result.products;
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
