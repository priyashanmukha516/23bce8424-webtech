const express = require('express');
const app = express();
app.use(express.json());

// 1. Global middleware - logs ALL requests
app.use((req, res, next) => {
  console.log(`📊 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`   IP: ${req.ip}, User-Agent: ${req.get('User-Agent')}`);
  next();
});

// 2. Global middleware - adds timestamp to all requests
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  console.log('⏰ Timestamp added to request');
  next();
});

// 3. Route-specific middleware for /admin/*
const adminAuth = (req, res, next) => {
  console.log('🔐 Admin middleware - checking auth...');
  req.user = { role: 'admin', name: 'Admin User' };
  next();
};

// 4. Another admin middleware
const adminLogger = (req, res, next) => {
  console.log(`👑 Admin access for ${req.user.name} at ${req.timestamp}`);
  next();
};

// Public route with specific middleware
app.get('/public', (req, res, next) => {
  console.log('🌍 Public route middleware executed');
  next();
}, (req, res) => {
  res.json({ message: 'Public endpoint', timestamp: req.timestamp });
});

// Admin protected routes
app.get('/admin/users', adminAuth, adminLogger, (req, res) => {
  res.json({ message: 'Admin users data', user: req.user });
});

app.post('/admin/settings', adminAuth, (req, res) => {
  console.log('⚙️ Admin settings updated');
  res.json({ success: true, settings: req.body });
});

// Error handling middleware (always last)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Middleware demo at http://localhost:${PORT}`);
  console.log('Try: GET /public, /admin/users, POST /admin/settings');
});