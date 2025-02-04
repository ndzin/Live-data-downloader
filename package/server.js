let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...', request.url);

    const root = `${__dirname}/downloads`;
    let filePath = root + request.url;
    if (filePath === `${root}/`)
        filePath = './index.html';

    let extname = path.extname(filePath);

    let contentType = 'application/octet-stream';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code === 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(80, '0.0.0.0');
console.log('Server running at http://127.0.0.1:80/');