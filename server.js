var fs = require('fs');
var path = require('path');
var http = require('http');
var nodeStatic = require('node-static');

var fileServer = new nodeStatic.Server('./public');

var creativeDirectory = path.join(__dirname, 'public', 'creatives');
var availableCreatives = fs.readdirSync(creativeDirectory);


// Start the server
http.createServer(function (req, res) {

  if (req.url !== '/favicon.ico') {
    console.log('The URL is:', req.url);
  }

  switch (req.url) {

    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('<iframe src="/showBanner" width="300" height="250" frameborder="0" />');
      break;

    case '/showBanner':

      var fileName = availableCreatives[Math.floor(Math.random() * availableCreatives.length)];

      console.log('Serving banner');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('<html><body style="margin: 0;"><img src="/creatives/' + fileName + '"></body></html>');
      break;

    default:
      if (req.url === '/favicon.ico') return;
      fileServer.serveFile(req.url, 200, {}, req, res, function(){});

  }


}).listen(1337, '0.0.0.0');

console.log('Server running at http://127.0.0.1:1337/');


















