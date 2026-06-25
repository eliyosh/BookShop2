import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  // inventory 18 books
  inventory = signal([
    { 
      id: 1, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', price: 850, type: 'Physical', salesCount: 150, readCount: 10, cover: 'assets/subtle.png',
      genre: 'Self-Help / Psychology', ageGroup: '18+ Adults', yearPublished: 2016,
      description: 'A counterintuitive approach to living a good life through cut-through honesty and embracing realities.'
    },
    { 
      id: 2, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', price: 920, type: 'Physical', salesCount: 140, readCount: 20, cover: 'assets/seven.png',
      genre: 'Historical Fiction / Drama', ageGroup: '16+ Young Adults', yearPublished: 2017,
      description: 'An aging Hollywood movie icon recounts her glamorous and scandalous life history to an unknown magazine reporter.'
    },
    { 
      id: 3, title: 'The Moonlight Lilac Vol. 1', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 115, readCount: 5, cover: 'assets/lilac.png',
      genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2024,
      description: 'Unravel a gothic world hidden in deep midnight shadows, forbidden magic paths, and dangerous affairs.'
    },
    { 
      id: 4, title: 'The Moonlight Lilac Vol. 2', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 98, readCount: 12, cover: 'assets/lilac.png',
      genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2024,
      description: 'The second installment following hidden paths of moonlight magic where crowns clash and secrets break.'
    },
    { 
      id: 5, title: 'The Moonlight Lilac Vol. 3', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 88, readCount: 15, cover: 'assets/lilac.png',
      genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2025,
      description: 'The final layout chapter in the Moonlight Lilac trilogy resolving dark magic bloodlines and empires.'
    },
    { 
      id: 6, title: 'Kissing My Kryptonite', author: 'Moshnihart', price: 680, type: 'Physical', salesCount: 125, readCount: 8, cover: 'assets/kissing.png',
      genre: 'New Adult Fiction', ageGroup: '16+ Young Adults', yearPublished: 2025,
      description: 'When structural worlds collide, two rivals discover a thin line between hatred and genuine romance.'
    },
    { 
      id: 7, title: 'Illicit Affair', author: 'alittlesaucy', price: 720, type: 'Physical', salesCount: 110, readCount: 22, cover: 'assets/illicit.jpg',
      genre: 'Dark Contemporary Romance', ageGroup: '18+ Adults', yearPublished: 2023,
      description: 'A gripping tale of forbidden choices, hidden glances, and the dangerous consequences of keeping deep secrets.'
    },
    { 
      id: 8, title: 'Endless Love', author: 'gayreen', price: 590, type: 'E-Book', salesCount: 45, readCount: 195, cover: 'assets/endless.jpg',
      genre: 'New Adult Romance', ageGroup: '16+ Young Adults', yearPublished: 2022,
      description: 'An emotional journey tracking a timeless connection that bends through years of heartbreak and growth.'
    },
    { 
      id: 9, title: "Psychopath's Obsession", author: 'gayreen', price: 620, type: 'E-Book', salesCount: 55, readCount: 210, cover: 'assets/obsession.jpg',
      genre: 'Psychological Thriller Romance', ageGroup: '18+ Adults', yearPublished: 2024,
      description: 'A dark, high-stakes story of intense devotion where boundaries vanish and passion becomes dangerous.'
    },
    { 
      id: 10, title: 'The Psychology of Money', author: 'Morgan Housel', price: 790, type: 'E-Book', salesCount: 85, readCount: 180, cover: 'assets/money.jpg',
      genre: 'Finance / Wealth Management', ageGroup: 'All Ages', yearPublished: 2020,
      description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave.'
    },
    { 
      id: 11, title: 'The Laws of Human Nature', author: 'Robert Greene', price: 1150, type: 'Physical', salesCount: 75, readCount: 30, cover: 'assets/laws.jpg',
      genre: 'Psychology / Self-Improvement', ageGroup: '18+ Adults', yearPublished: 2018,
      description: 'A brilliant handbook decoding structural human behaviors, motivations, and social cognitive strategies.'
    },
    { 
      id: 12, title: 'It Ends with Us', author: 'Colleen Hoover', price: 690, type: 'Physical', salesCount: 160, readCount: 40, cover: 'assets/ends.jpg',
      genre: 'Contemporary Drama', ageGroup: '17+ Mature YA', yearPublished: 2016,
      description: 'An honest, heartbreaking story about the complicated patterns of relationships and finding the strength to break them.'
    },
    { 
      id: 13, title: 'Every Last Word', author: 'Tamara Ireland Stone', price: 550, type: 'E-Book', salesCount: 35, readCount: 165, cover: 'assets/last.jpg',
      genre: 'Mental Health Fiction / YA', ageGroup: '14+ Teens', yearPublished: 2015,
      description: 'A beautiful look into a girl navigating Obsessive-Compulsive Disorder who finds belonging in a hidden poetry club.'
    },
    { 
      id: 14, title: "A Good Girl's Guide to Murder", author: 'Holly Jackson', price: 640, type: 'E-Book', salesCount: 92, readCount: 188, cover: 'assets/good.jpg',
      genre: 'True Crime Mystery / Thriller', ageGroup: '14+ Teens', yearPublished: 2019,
      description: 'A smart student investigates a closed local school murder case for her final project and uncovers dangerous secrets.'
    },
    { 
      id: 15, title: 'A Gentle Reminder', author: 'Bianca Sparacino', price: 480, type: 'E-Book', salesCount: 40, readCount: 175, cover: 'assets/gentle.jpg',
      genre: 'Poetry / Self-Love', ageGroup: 'All Ages', yearPublished: 2020,
      description: 'A collection of gentle reminders for the days you need to hear that you are healing, growing, and worthy.'
    },
    { 
      id: 16, title: 'Powerless', author: 'Lauren Roberts', price: 890, type: 'E-Book', salesCount: 60, readCount: 155, cover: 'assets/powerless.jpg',
      genre: 'Fantasy / Romantasy', ageGroup: '14+ Teens', yearPublished: 2023,
      description: 'In a kingdom where only the elite hold powers, an ordinary girl must survive a deadly competition against the prince.'
    },
    { 
      id: 17, title: 'If He Had Been with Me', author: 'Laura Nowlin', price: 520, type: 'Physical', salesCount: 105, readCount: 25, cover: 'assets/if.jpg',
      genre: 'Tragic Romance / YA', ageGroup: '14+ Teens', yearPublished: 2013,
      description: 'An emotional look into what-ifs, childhood memories, and paths that changed on one rainy evening.'
    },
    { 
      id: 18, title: 'The Rain in España', author: 'Gwy Saludes', price: 750, type: 'Physical', salesCount: 130, readCount: 35, cover: 'assets/rain.jpg',
      genre: 'Filipino New Adult Fiction', ageGroup: '16+ Young Adults', yearPublished: 2020,
      description: 'The viral university series mapping legal studies, architecture student circles, and finding home under structural storms.'
    }
  ]);

  // inventory tracker
  searchQuery = signal('');
  selectedBook = signal<any | null>(null);
  selectedFormat = signal<'Hardbound' | 'E-Book'>('Hardbound');

  // inventory
  filteredInventory = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.inventory();
    return this.inventory().filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    );
  });

  // cart state
  private cartItems = signal<any[]>([]);
  cart = this.cartItems.asReadonly();

  
  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  
  openDetails(book: any) {
    this.selectedBook.set(book);
    this.selectedFormat.set('Hardbound');
  }

  closeDetails() {
    this.selectedBook.set(null);
  }

  // carts
  addToCart(book: any, chosenFormat: 'Hardbound' | 'E-Book') {
    const finalPrice = chosenFormat === 'E-Book' ? book.price - 300 : book.price;
    const existing = this.cartItems().find(item => item.id === book.id && item.format === chosenFormat);
    
    if (existing) {
      this.cartItems.update(items =>
        items.map(item => (item.id === book.id && item.format === chosenFormat) ? { ...item, quantity: item.quantity + 1 } : item)
      );
    } else {
      this.cartItems.update(items => [...items, { ...book, price: finalPrice, format: chosenFormat, quantity: 1 }]);
    }
    
    // count shift
    this.inventory.update(books =>
      books.map(b => b.id === book.id ? { ...b, salesCount: b.salesCount + 1 } : b)
    );
  }

  updateQuantity(bookId: number, chosenFormat: string, amount: number) {
    this.cartItems.update(items =>
      items.map(item => {
        if (item.id === bookId && item.format === chosenFormat) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  }

  removeFromCart(bookId: number, chosenFormat: string) {
    this.cartItems.update(items => items.filter(item => !(item.id === bookId && item.format === chosenFormat)));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}