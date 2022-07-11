const http = require('http');
const url = require('url');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler;
    if(typeof router[trimPath] === 'undefined'){
        chosenHandler = handlers.notFound;
    }else{
        chosenHandler = router[trimPath];
    }
    chosenHandler(req, res);
})
server.listen(8080, () => {
    console.log('Running')
})

let handlers = {};

handlers.register = (req, res) => {
    fs.readFile('./view/register.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    })
}

handlers.login = (req, res) => {
    fs.readFile('./view/login.html', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.notFound = (req, res) => {
    fs.readFile('./view/not_found.html', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

let router = {
    'register': handlers.register,
    'login': handlers.login
}