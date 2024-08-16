const http = require('http');
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // Set header content type
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello World</h1>');
    // res.write('<h3>Creating servers is easy</h3>');
    // res.end();


    //Url routing to point to different pages in your application

    //Lodash
const num = _.random(0,20)    // Logs a random number every time the server runs
console.log(num)

const greet = _.once(()=>{    // calls the function only once
    console.log("Hello")
}
)
greet()
greet()

let path = './views/'

switch(req.url){
    case '/':
        path += 'bookstore.books.json'
        res.statusCode = 200
        break;

    case '/home':
        path += 'home.html'
        res.statusCode = 200
        break;
    case '/home-us':                      // Redirecting url beacause I changed it from views/home.me to views/home
            res.statusCode = 301
            res.setHeader('location', '/home')
            res.end()
         break;

    default:
        path += '404.html'
        res.statusCode = 404
        break;
}

// fs.readFile('./views/bookstore.books.json', (err, data) =>{
//     if(err) {
//         console.log(err)
//         res.end()
//     }else{
//         res.write(data)
//         res.end()
//     }
// })
fs.readFile(path, (err, data) =>{
    if(err) {
        console.log(err)
        res.end()
    }else{
        res.write(data)
        res.end()
    }
})
});

server.listen(8080, 'localhost', () => {
    console.log("Listening on port 8080");
});
