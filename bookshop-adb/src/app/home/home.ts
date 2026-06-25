import { Component, inject} from '@angular/core';
import {cartService} from '../cart';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  cartService = inject (cartService);
}
