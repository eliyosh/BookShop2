import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})

export class LibraryComponent {
  private http = inject(HttpClient);
  
  searchPhone = signal('');
  digitalBooks = signal<any[]>([]);
  hasSearched = signal(false);

  updatePhone(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchPhone.set(value);
  }

  fetchMyLibrary() {
    const phone = this.searchPhone().trim();
    if (!phone) {
      alert('Please enter your contact or phone number to access your shelf!');
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/library/${phone}`).subscribe({
      next: (data) => {
        this.digitalBooks.set(data);
        this.hasSearched.set(true);
      },
      error: (err) => {
        console.error('Failed to stream library items:', err);
        alert('Server connection failure. Could not fetch your shelf.');
      }
    });
  }
  openReader(title: string) {
    alert(`Opening online viewer engine for: "${title}"...\nEnjoy reading your literature copy!`);
  }
}