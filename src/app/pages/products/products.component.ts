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
import {
  ActivatedRoute,
  Router,
  withComponentInputBinding,
} from '@angular/router';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
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
    MatSliderModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  totalPage: any;
  categories: string[] = ['Men', 'Women', 'Girls', 'Boys'];
  discounts: number[] = [20, 30, 40, 50, 60, 70, 80, 90];
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

  /* const newQueryParams = {
      page: this.page,
      //category: this.category,
      brand: this.paramBrandVAlue,
      discount: this.discountPercent,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    }; */

  updateQueryParams(newQueryParams: any) {
    this.router.navigate([], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    //called once after constructor get called

    /* this.activatedRoute.queryParamMap.subscribe((value) => {
      console.log('paramMap', value);
      console.log('search', value.get('search'));
      console.log('category', value.get('category'));
      console.log('brand', value.get('brand'));
      const b = value.get('brand');
      console.log('brand in  array form', b?.split(','));
      console.log('page', value.get('page'));
    }); */

    // this.getMenTrendingProduct();
    this.getSearchedAndFilteredData();
  }

  queryData = {
    search: '',
    page: 1,
    category: '',
    limit: '',
    brand: '',
    discount: 0,
    minPrice: 0,
    maxPrice: 10000,
  };

  category: string = '';
  onCategoryChange(event: Event) {
    console.log('change detected : ', event);
    const newQueryParams = {
      category: event,
    };
    this.updateQueryParams(newQueryParams);
  }

  discountPercent = 0;
  onDiscountChange(event: Event) {
    console.log('change detected : ', event);
    const newQueryParams = {
      discount: this.discountPercent,
    };
    this.updateQueryParams(newQueryParams);
  }

  maxPrice = 10000;
  minPrice = 0;
  onPriceRangeChange(event: Event) {
    console.log('change detected : ', event);
    const newQueryParams = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    };
    this.updateQueryParams(newQueryParams);
  }

  page = 1;
  onPageChange(p: number) {
    console.log(this.page);
    const newQueryParams = {
      page: this.page,
    };
    this.updateQueryParams(newQueryParams);
  }

  checkboxvalue = '';
  selectedCheckBoxSet = new Set();
  paramBrandVAlue: any;
  onCheckboxChange(checkbox: MatCheckboxChange) {
    if (checkbox.checked === true) {
      this.selectedCheckBoxSet.add(checkbox.source.value);
    }
    if (checkbox.checked === false) {
      this.selectedCheckBoxSet.delete(checkbox.source.value);
    }

    this.paramBrandVAlue = [...this.selectedCheckBoxSet].join(',');
    //console.log('this.selectedCheckBoxSet', this.selectedCheckBoxSet);
    this.paramBrandVAlue = [...this.selectedCheckBoxSet].join(',');
    //console.log('this.paramBrandVAlue', this.paramBrandVAlue);
    const newQueryParams = {
      brand: this.paramBrandVAlue,
    };
    this.updateQueryParams(newQueryParams);
    //  this.getSearchedAndFilteredData();
  }

  searchedAndFilteredProducts: any;
  selectedCheckBoxValue: any;
  /*  getSearchedAndFilteredData() {
    this.activatedRoute.queryParams.subscribe({
      next: (value: any) => {
        this.selectedCheckBoxValue = [...this.selectedCheckBoxSet];
        console.log('this.selectedCheckBoxValue', this.selectedCheckBoxValue);
        console.log('queryValue', value);
        this.queryData.search = value.search;
        this.queryData.category = this.cat;
        this.queryData.brand = this.selectedCheckBoxValue;
        this.queryData.page = this.page;
        console.log('this.queryData.page :', this.queryData.page);
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
  } */

  getSearchedAndFilteredData() {
    this.activatedRoute.queryParamMap.subscribe({
      next: (value: any) => {
        console.log('queryParamMap values', value);
        console.log('query discount :', value.get('discount'));

        this.queryData.search = value.get('search') ? value.get('search') : '';

        this.queryData.category = value.get('category')
          ? value.get('category')
          : '';

        const brnd = value.get('brand');
        //console.log(brnd?.split(','));
        this.queryData.brand = brnd ? brnd.split(',') : [];

        this.queryData.page = value.get('page') ? value.get('page') : this.page;

        this.queryData.discount = value.get('discount')
          ? value.get('discount')
          : 0;

        this.queryData.minPrice = value.get('minPrice')
          ? value.get('minPrice')
          : this.minPrice;

        this.queryData.maxPrice = value.get('maxPrice')
          ? value.get('maxPrice')
          : this.maxPrice;

        this.productService.searchAndFilteredProduct(this.queryData).subscribe({
          next: (result: any) => {
            console.log(result);
            this.totalPage = result.productCount;
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

  addToWishlist(e: Event) {
    //console.log(e);
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
