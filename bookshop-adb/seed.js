require('dotenv').config();
const mongoose = require('mongoose');

// connection to .env cluster
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database cluster... Starting seed loop.'))
  .catch(err => console.error('Seeder connection error:', err));

// schema structure books
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String, author: String, price: Number, type: String,
  salesCount: Number, readCount: Number, cover: String,
  genre: String, ageGroup: String, yearPublished: Number, description: String
}), 'books');

// 18 books that will be stored
const booksData = [
  { id: 1, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', price: 850, type: 'Physical', salesCount: 150, readCount: 10, cover: 'assets/subtle.png', genre: 'Self-Help / Psychology', ageGroup: '18+ Adults', yearPublished: 2016, description: 'A counterintuitive approach to living a good life.' },
  { id: 2, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', price: 920, type: 'Physical', salesCount: 140, readCount: 20, cover: 'assets/seven.png', genre: 'Historical Fiction / Drama', ageGroup: '16+ Young Adults', yearPublished: 2017, description: 'An aging Hollywood movie icon recounts her life.' },
  { id: 3, title: 'The Moonlight Lilac Vol. 1', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 115, readCount: 5, cover: 'assets/lilac.png', genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2024, description: 'Unravel a gothic world hidden in deep midnight shadows.' },
  { id: 4, title: 'The Moonlight Lilac Vol. 2', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 98, readCount: 12, cover: 'assets/lilac.png', genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2024, description: 'The second installment following hidden paths of moonlight magic.' },
  { id: 5, title: 'The Moonlight Lilac Vol. 3', author: 'Cassncase', price: 650, type: 'Physical', salesCount: 88, readCount: 15, cover: 'assets/lilac.png', genre: 'Spicy Fantasy Romance', ageGroup: '18+ Adults', yearPublished: 2025, description: 'The final chapter in the Moonlight Lilac trilogy.' },
  { id: 6, title: 'Kissing My Kryptonite', author: 'Moshnihart', price: 680, type: 'Physical', salesCount: 125, readCount: 8, cover: 'assets/kissing.png', genre: 'New Adult Fiction', ageGroup: '16+ Young Adults', yearPublished: 2025, description: 'When worlds collide, two rivals discover a thin line.' },
  { id: 7, title: 'Illicit Affair', author: 'alittlesaucy', price: 720, type: 'Physical', salesCount: 110, readCount: 22, cover: 'assets/illicit.jpg', genre: 'Dark Contemporary Romance', ageGroup: '18+ Adults', yearPublished: 2023, description: 'A gripping tale of forbidden choices and hidden glances.' },
  { id: 8, title: 'Endless Love', author: 'gayreen', price: 590, type: 'E-Book', salesCount: 45, readCount: 195, cover: 'assets/endless.jpg', genre: 'New Adult Romance', ageGroup: '16+ Young Adults', yearPublished: 2022, description: 'An emotional journey tracking a timeless connection.' },
  { id: 9, title: "Psychopath's Obsession", author: 'gayreen', price: 620, type: 'E-Book', salesCount: 55, readCount: 210, cover: 'assets/obsession.jpg', genre: 'Psychological Thriller Romance', ageGroup: '18+ Adults', yearPublished: 2024, description: 'A dark story of intense devotion where boundaries vanish.' },
  { id: 10, title: 'The Psychology of Money', author: 'Morgan Housel', price: 790, type: 'E-Book', salesCount: 85, readCount: 180, cover: 'assets/money.jpg', genre: 'Finance / Wealth Management', ageGroup: 'All Ages', yearPublished: 2020, description: 'Doing well with money is about how you behave.' },
  { id: 11, title: 'The Laws of Human Nature', author: 'Robert Greene', price: 1150, type: 'Physical', salesCount: 75, readCount: 30, cover: 'assets/laws.jpg', genre: 'Psychology / Self-Improvement', ageGroup: '18+ Adults', yearPublished: 2018, description: 'A handbook decoding human behaviors and motivations.' },
  { id: 12, title: 'It Ends with Us', author: 'Colleen Hoover', price: 690, type: 'Physical', salesCount: 160, readCount: 40, cover: 'assets/ends.jpg', genre: 'Contemporary Drama', ageGroup: '17+ Mature YA', yearPublished: 2016, description: 'An honest story about complicated patterns of relationships.' },
  { id: 13, title: 'Every Last Word', author: 'Tamara Ireland Stone', price: 550, type: 'E-Book', salesCount: 35, readCount: 165, cover: 'assets/last.jpg', genre: 'Mental Health Fiction / YA', ageGroup: '14+ Teens', yearPublished: 2015, description: 'A girl navigating OCD who finds belonging in a poetry club.' },
  { id: 14, title: "A Good Girl's Guide to Murder", author: 'Holly Jackson', price: 640, type: 'E-Book', salesCount: 92, readCount: 188, cover: 'assets/good.jpg', genre: 'True Crime Mystery / Thriller', ageGroup: '14+ Teens', yearPublished: 2019, description: 'A smart student investigates a closed local murder case.' },
  { id: 15, title: 'A Gentle Reminder', author: 'Bianca Sparacino', price: 480, type: 'E-Book', salesCount: 40, readCount: 175, cover: 'assets/gentle.jpg', genre: 'Poetry / Self-Love', ageGroup: 'All Ages', yearPublished: 2020, description: 'A collection of gentle reminders for healing and growing.' },
  { id: 16, title: 'Powerless', author: 'Lauren Roberts', price: 890, type: 'E-Book', salesCount: 60, readCount: 155, cover: 'assets/powerless.jpg', genre: 'Fantasy / Romantasy', ageGroup: '14+ Teens', yearPublished: 2023, description: 'An ordinary girl must survive a deadly competition against the prince.' },
  { id: 17, title: 'If He Had Been with Me', author: 'Laura Nowlin', price: 520, type: 'Physical', salesCount: 105, readCount: 25, cover: 'assets/if.jpg', genre: 'Tragic Romance / YA', ageGroup: '14+ Teens', yearPublished: 2013, description: 'An emotional look into what-ifs and childhood memories.' },
  { id: 18, title: 'The Rain in España', author: 'Gwy Saludes', price: 750, type: 'Physical', salesCount: 130, readCount: 35, cover: 'assets/rain.jpg', genre: 'Filipino New Adult Fiction', ageGroup: '16+ Young Adults', yearPublished: 2020, description: 'The viral university series mapping legal and architecture studies.' }
];

async function seedDB() {
  try {
    await Book.deleteMany({}); // prevents duplication
    await Book.insertMany(booksData);
    console.log('Successfully seeded all 18 books into MongoDB Atlas!');
  } catch (error) {
    console.error('Failed to populate tables:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
