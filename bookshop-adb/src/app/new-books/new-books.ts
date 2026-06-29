
import { Component, inject, signal } from '@angular/core';
import { CartService } from '../cart';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './new-books.html',
  styleUrl: './new-books.css'
})
export class NewBooks {
  cartService = inject(CartService);

//validation
  customerData = signal({ name: '', phone: '', address: '' });

  updateField(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.customerData.update(current => ({ ...current, [field]: value }));
  }

  processReceipt() {
    const form = this.customerData();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill out all missing kiosk delivery validation inputs!');
      return;
    }
    
    alert(`Order Confirmed!\n\nThank you, ${form.name}.\nYour invoice total of ₱${this.cartService.totalPrice()} has been logged securely.\nDeliveries will dispatch directly to: ${form.address}.`);
    this.cartService.clearCart();
  }
}
