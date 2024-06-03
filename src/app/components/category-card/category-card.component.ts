import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  constructor() {}
  @Input() brandData: any;

  getData(e: Event) {
    console.log('button clicked');
    console.log(e);
  }
}
