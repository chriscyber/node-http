const http = require('http');

const hostname = 'localhost';
const port = 3003;

const path = require('path');
const fs = require('fs');

//req and res perameters are called 'streams' where data is read in pieces/chunks. the stream objects are passed in at the time request is received, so we don't create the object, but rather input requested data into it. 
const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method === "GET") {
    let fileUrl = req.url;
    if (fileUrl === '/') {  //localhost will return '/'
      fileUrl = '/index.html';
    }
    //get absolute path of file requested
    const filePath = path.resolve('./public' + fileUrl)
    //server to only grant requests for html files
    const fileExt = path.extname(filePath);

    if (fileExt === '.html') {
      //check if file exists and is accessible
      fs.access(filePath, err => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`<html><body><h1>Error 404: ${fileUrl} not found.</h1></body></html>`); 
          return; //return here so code after does not execute???
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      fs.createReadStream(filePath).pipe(res); //loads pieces of file into memory at a time, and pipes it over to response object to read. 2 objects can use pipe, which sends data from one object to another - method of streams.
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1>Error 404: ${fileUrl} is not an html file</h1></body></html>`);
    }

  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});