import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss',
  imports: [CommonModule, ProductCardComponent],
})
export class ProductSliderComponent {
  @Input() Products!: any;
  @Output() productId = new EventEmitter();

  add(e: Event) {
    this.productId.emit(e);
  }
}
