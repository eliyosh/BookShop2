import { Component, inject} from '@angular/core';
import {CartService} from '../cart';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [],
  templateUrl: './home.html',
})
export class Home {
  cartService = inject (CartService);
}
