require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const app =express();

app.use(express.json());
app.use(cors());

//establish db connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Successfully connected to Ellavated Bookshop DB Cluster'))
.catch(err => console.error('Database connection error:', err)); 

//data schema and model
const Book =mongoose.model('Book', new mongoose.Schema({
    title: { type: String, required: true},
    author:{ type: String, required: true},
    price:{type: Number, required: true},
    type:{type: String, required: true},
    salesCount:{type: Number, default: 0},
    readCount:{type: Number, default:0},
    cover:String,
    genre:String,
    ageGroup: String,
    yearPublished: Number,
    description:String,
}), 'books');

//data schema and model for billing
const Order = mongoose.model('Order', new mongoose.Schema({
    customerName:{type: String, required: true},
    phone: {type: String, required:true},
    address: {type: String, required: true},
    items:[{
        bookId: Number,
        title: String,
        format: String,
        quantity:Number,
        price:Number,
        cover:String
    }],
    totalAmount:{type: Number, required: true},
    orderDate: {type:Date, default: Date.now}
}), 'orders');


//API handlers
//get fetch
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch database inventory streams.' });
  }
});

app.get('/api/library/:phone', async (req, res) => {
  try {
    const orders = await Order.find({phone: req.params.phone});
    
    let ebooks = []; 
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.format === 'E-Book') {
          ebooks.push(item);
        }
      });
    });

    res.send(ebooks); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch digital library.' });
  }
});

  //post add new catalog book metadate elements
  app.post('/api/books', async (req, res) => {
    try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ error: 'Failed to log down new book item format.' });
    }
  });

  //post process billing checkout reeipt orders
  app.post('/api/orders', async (req, res) => {
    try {
      console.log("Incoming cart data received: ", req.body);

      const newOrder = new Order({
        customerName: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        items: req.body.items,
        totalAmount: req.body.totalPrice
      });
      
      await newOrder.save();
      console.log("Success, Order saved to DB");
  
      //to update books collection
      if (req.body.items && Array.isArray(req.body.items)) {
        for (const item of req.body.items) {
          const isEBook = item.format === 'E-Book';
          await Book.findOneAndUpdate(
            { title: item.title },
            { $inc: { salesCount: item.quantity, readCount: isEBook ? item.quantity : 0 } }
          );
        }
        console.log("Inventory Updated!");
      }
      res.send({ message: 'Purchase logged safely.', orderId: newOrder._id });
    } catch (error) {
      console.error("DB save failed", error);
      res.status(400).send({ error: 'Failed to log database billing payload.' });
    }
 });

  // delete: remove book entries 
  app.delete('/api/books/:id', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) return res.status(404).json({ error: 'Book entry not found.' });
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to execute deletion loop.' });
    }
  });

  // put: update target book information properties
  app.put('/api/books/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBook) return res.status(404).json({ error: 'Book entry not found.' });
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ error: 'Failed to execute structural update calculations.' });
    }
  });

  //continous network portal listener
  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ellavated API Engine running smoothly on Port ${PORT}`);
});