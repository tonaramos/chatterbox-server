var stubs = require('./spec/Stubs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

let message = {
  results: []
};
  
var requestHandler = function(request, response) {
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  
  if (request.method === 'GET' && request.url === '/classes/messages') {
    if (request.url === '/favicon.ico') {
      response.writeHead(404, {'Content-Type': 'json'});
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'json'});
      response.end(JSON.stringify(message));
    }
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {     
      body = Buffer.concat(body).toString();
      message.results.push(JSON.parse(body));
      response.writeHead(201, {'Content-Type': 'json'});
      response.end();
    });
    
  } else {
    response.statusCode = 404;
    response.end();
  }
};

exports.requestHandler = requestHandler;
