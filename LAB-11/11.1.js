const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  if (req.url === '/' && req.method === 'GET') {
    res.write('<h1>Welcome to Node.js Server!</h1>');
    res.write('<p>Server is running perfectly.</p>');
    res.end();
  } else if (req.url === '/about' && req.method === 'GET') {
    res.write('<h1>About Page</h1>');
    res.write('<p>This is a simple Node.js HTTP server demo.</p>');
    res.end();
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('404 - Page Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Access / or /about in your browser');
});