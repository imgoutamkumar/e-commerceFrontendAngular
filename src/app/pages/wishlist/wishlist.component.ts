import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistCardComponent } from '../../components/wishlist-card/wishlist-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    WishlistCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnChanges {
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.getWishlistItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges hook called');
  }

  wishlistItemsData: any;
  getWishlistItems() {
    this.wishlistService.getWishlist().subscribe({
      next: (result: any) => {
        this.wishlistItemsData = result;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
