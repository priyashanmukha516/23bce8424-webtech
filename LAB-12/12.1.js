const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory storage (replace with DB in production)
let products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics' }
];
let nextId = 3;

// GET all products
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// POST create product
app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  
  const newProduct = { id: nextId++, name, price, category };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  
  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, data: products[index] });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  
  products.splice(index, 1);
  res.json({ success: true, message: 'Product deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}/api/products`);
  console.log('Test with: GET/POST/PUT/DELETE /api/products or /api/products/:id');
});