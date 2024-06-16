import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    console.log('onInit called');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.log('afterViewChecked called');
  }
  @Input() cartItemsData: any;
  product: any;
  getProductDetails(id: any) {
    this.router.navigate(['/productDetail/', id]);
  }

  removeCartItem(productId: string) {
    this.cartService.removeItemFromCart(productId).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  quantity(value: string) {
    if (this.cartItemsData.quantity > 1 && value == 'decrease') {
      this.cartItemsData.quantity -= 1;
    }
    if (this.cartItemsData.quantity < 5 && value == 'increase') {
      this.cartItemsData.quantity += 1;
    }
  }
}
