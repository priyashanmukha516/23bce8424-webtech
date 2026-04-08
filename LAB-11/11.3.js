const EventEmitter = require('events');
const myEmitter = new EventEmitter();

console.log('Event-driven demo started...');

// Register multiple listeners for same event
myEmitter.on('userLogin', (user, timestamp) => {
  console.log(`👤 User ${user} logged in at ${timestamp}`);
});

myEmitter.on('userLogin', (user, timestamp) => {
  console.log(`📧 Sending welcome email to ${user}`);
});

myEmitter.on('orderPlaced', (orderId, amount) => {
  console.log(`🛒 Order #${orderId} placed for $${amount}`);
});

myEmitter.on('orderPlaced', (orderId, amount) => {
  console.log(`💳 Processing payment for order #${orderId}`);
});

// Trigger events with data
console.log('\n--- Triggering events ---');
myEmitter.emit('userLogin', 'alice@example.com', new Date().toISOString());
myEmitter.emit('orderPlaced', 'ORD-123', 99.99);

// Add listener after emit (won't catch previous events)
myEmitter.on('greeting', (message) => {
  console.log(`🎉 Event received: ${message}`);
});
myEmitter.emit('greeting', 'Hello from EventEmitter!');

console.log('\nEvent demo completed.');