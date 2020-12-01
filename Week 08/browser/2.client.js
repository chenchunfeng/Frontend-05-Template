const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method || 'get';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.port || {};
        this.headers = options.headers || {};
        if(!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-rulencoded';
        }
        if(!this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        }else if (this.headers['Content-Type'] === 'application/x-www-form-rulencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key]).join('&')}`);
        }

        this.headers['Content-Length'] = this.bodyText.length;

    }

    send() {
        return new Promise((resolve, reject) => {
            // hello world
        })
    }
}
void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-foo2']: 'customed'
        },
        body: {
            name: 'hello'
        }
    });
    let response = await request.send();
    console.log(response);
}