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
      alert('Please enter your contact phone number to access your shelf!');
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/library/${phone}`).subscribe({
      next: (data) => {
    
        const mappedData = data.map(book => {
          let coverPath = 'assets/default-cover.png'; 

          if (book.title === "Psychopath's Obsession") coverPath = 'assets/obsession.jpg';
          else if (book.title === "Every Last Word") coverPath = 'assets/last.jpg';
          else if (book.title === "The Seven Husbands of Evelyn Hugo") coverPath = 'assets/seven.png';
          else if (book.title === "The Subtle Art of Not Giving a F*ck") coverPath = 'assets/subtle.png';
          else if (book.title === "The Moonlight Lilac Vol. 1") coverPath = 'assets/lilac.png';
          else if (book.title === "The Moonlight Lilac Vol. 2") coverPath = 'assets/lilac.png';
          else if (book.title === "The Moonlight Lilac Vol. 3") coverPath = 'assets/lilac.png';
          else if (book.title === "Kissing My Kryptonite") coverPath = 'assets/kissing.png';
          else if (book.title === "Illicit Affair") coverPath = 'assets/illicit.jpg';
          else if (book.title === "Endless Love") coverPath = 'assets/endless.jpg';
          else if (book.title === "The Psychology of Money") coverPath = 'assets/money.jpg';
          else if (book.title === "The Laws of Human Nature") coverPath = 'assets/laws.jpg';
          else if (book.title === "It Ends with Us") coverPath = 'assets/ends.jpg';
          else if (book.title === "A Good Girl's Guide to Murder") coverPath = 'assets/good.jpg';
          else if (book.title === "A Gentle Reminder") coverPath = 'assets/gentle.jpg';
          else if (book.title === "Powerless") coverPath = 'assets/powerless.jpg';
          else if (book.title === "If He Had Been with Me") coverPath = 'assets/if.jpg';
          else if (book.title === "The Rain in España") coverPath = 'assets/rain.jpg';

          return { ...book, cover: coverPath };
        });

        this.digitalBooks.set(mappedData);
        this.hasSearched.set(true);
      },
      error: (err) => {
        console.error('Failed to stream library items:', err);
        alert('Server connection failure. Could not fetch your shelf.');
      }
    });
  }

 
  openReader(title: string) {
    alert(`Opening online viewer engine for:\n"${title}"\n\nEnjoy reading your digital literature copy!`);
  }
}
