
import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from '../cart';

@Component({
  selector: 'app-order',
  standalone: true,
  imports:[],
  templateUrl: './new-books.html',
  styleUrl: './new-books.css'
})
export class NewBooks {
  cartService = inject(CartService);
  private http = inject(HttpClient);

//validation signals
  customerData = signal({ name: '', phone: '', address: '' });

  updateField(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.customerData.update(current => ({ ...current, [field]: value }));
  }

  processReceipt() {
    const form = this.customerData();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill out all missing delivery information inputs!');
      return;
    }
    
    const orderPayload={
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: this.cartService.cart(),
      totalPrice: this.cartService.totalPrice()
    };
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post('http://localhost:3000/api/orders', orderPayload, httpOptions).subscribe({
      next: (response: any) => {
      alert(`Order Confirmed!\n\nThank you, ${form.name}.\nYour invoice total of ₱${this.cartService.totalPrice()} has been logged securely.\nDeliveries will dispatch directly to: ${form.address}.`);
        this.cartService.clearCart();
     },
      error: (err) => {
      alert('Database Tranmission Failure! Check bankend node server.js is running');
      console.error('Connectyion Error Trace: ', err);
    }
  });
 }
}
