import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss',
})
export class WishlistCardComponent implements OnInit, OnChanges {
  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  @Input() wislistItem!: any;

  showProductDetails(id: string) {
    this.router.navigate(['/productDetail/', id]);
  }

  removeWishlistedItem(productId: string) {
    this.wishlistService.removeItemFromWishlist(productId).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
