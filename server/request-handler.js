var stubs = require('./spec/Stubs');
/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/

let message = {
    results: []
  };
  
var requestHandler = function(request, response) {
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  
  if (request.method === 'GET' && request.url === '/classes/messages') {

    if (request.url === '/favicon.ico') {
      response.writeHead(404, {'Content-Type': 'json'});
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'json'});
      // console.log('message results', message.results)
      response.write(JSON.stringify(message));
      response.end();
    }
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {     
      body = Buffer.concat(body).toString();
      message.results.push(JSON.parse(body));
      response.statusCode = 201;
      console.log("Message.results -----------", message.results);
      response.end();
    });
    
  } else {
    response.statusCode = 404;
    response.end();
  }
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
exports.requestHandler = requestHandler;
