import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnChanges {
  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
  }

  @Input() productData!: any;
  //@Output() data = new EventEmitter();

  showProductDetails(id: string) {
    this.router.navigate(['/productDetail/', id]);
  }

  addItemToWishlist(id: string) {
    //this.data.emit(id);
    console.log(id);
    this.wishlistService.addToWishlist(id.toString()).subscribe({
      next: (result: any) => {
        console.log('message:', result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
