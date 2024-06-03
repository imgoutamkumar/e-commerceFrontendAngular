import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  @Input() cartItemsData: any;
  product: any;
  getProductDetails(id: any) {
    this.router.navigate(['/productDetail/', id]);
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
