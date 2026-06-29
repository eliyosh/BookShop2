import { Component, inject } from '@angular/core';
import { CartService } from '../cart';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  cartService =inject(CartService)
}
