const http = require('http');

http.createServer((request, respones) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        respones.writeHead(200, {
            'Content-type': 'text/html'
        });
        respones.end('hello world \n');
    }).listen(8088);
})
console.log('server start');