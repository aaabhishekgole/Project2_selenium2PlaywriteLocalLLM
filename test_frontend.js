const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5173,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    // Just print the first 100 chars to verify we get HTML
    process.stdout.write(d.toString().substring(0, 100));
  });
});

req.on('error', (e) => {
  console.error(`PROBLEM: ${e.message}`);
});

req.end();
