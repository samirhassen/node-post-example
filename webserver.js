var http = require('http');

http.createServer( async (request, response) => {
    if(request.method == "POST") {
        response.writeHead(200, {
            'Content-type' : 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        })

        var params = request.url.slice();

        const buffert = [];

        console.log("request.payload : " + request.payload);
        for await (const readableChunk of request) {
            buffert.push(readableChunk);
        }

        var payload = Buffer.concat(buffert).toString();
        console.log("payload" + payload);
        
        response.end(JSON.stringify(payload));
    }
    else {
        response.writeHead(500, {'Content-type' : 'text/html'} )
        response.end('<h1>Wrong method, try POST</h1>')
    }
}).listen(8081)

console.log("Listening to https://127.0.0.1:8081");