const http = require('http')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')


const filepath = path.join(__dirname, 'test', 'file.html');
const jsonFilePath = path.join(__dirname, 'test', 'file.json')

const myServer = http.createServer((req, res) => {

    //Rendering HTMl content

    if (req.method === 'GET' && req.url === '/html') {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" })
                res.end("Server error")
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);

            }
        })
    }
    
    //Rendering JSON content

    else if (req.method === 'GET' && req.url === '/json') {
        fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" })
                res.end("Server error")

            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        })
    }

    //Return UUID 

    else if (req.method === 'GET' && req.url === '/uuid') {
        const uniqueId = uuid.v4()

        if (uniqueId) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 'uuid': uniqueId }));
        } else {
            res.writeHead(500, { "Content-Type": "text/plain" })
            res.end("Can not fetch data")
        }

    }

    //status code

    else if (req.method === 'GET' && req.url.startsWith('/status/')) {
        const statusCode = req.url.split('/')[2]
        if (!isNaN(statusCode) && http.STATUS_CODES[statusCode] !== undefined) {

            res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
            res.end(`status code is : ${statusCode} `)
        }
        else {
            res.writeHead(400, { "Content-Type": "text/plain" })
            res.end("Bad request")
        }

    }

    // Delay in seconds

    else if (req.method === 'GET' && req.url.startsWith('/delay')) {
        const delayInSeconds = req.url.split('/')[2]
        if (!isNaN(delayInSeconds)) {

            setTimeout(() => {

                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end(`getting response after ${delayInSeconds} seconds `);


            }, delayInSeconds * 1000);

        }
        else {
            res.writeHead(400, { 'Content-Type ': 'text/plain' })
            res.end("Bad request")
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'Text/plain' })
        res.end("Not found")
    }
})




myServer.listen(8000, () => console.log(`server started ! `));


