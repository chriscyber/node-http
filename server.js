const http = require('http');

const hostname = 'localhost';
const port = 3000;

//req and res perameters are called 'streams' where data is read in pieces/chunks. the stream objects are passed in at the time request is received, so we don't create the object, but rather input requested data into it. 
const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Hello World</h1></body></html>'); //can include body in .end it it's short
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});