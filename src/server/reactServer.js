// Import the HTTP module
const http = require("http");
// Import the URL module
const url = require("url");
const os = require("os");
const ip = require("ip");

const tcpClient = require('./tcpClient')

const reactServer = http.createServer((req, res) => {
    // Set our header
    const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days,
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        /** add other headers as per requirement */
    };
    // Parse the request url
    const parsed = url.parse(req.url, true)
    // Get the path from the parsed URL
    const reqUrl = parsed.pathname
    // Compare our request method
    if (req.method == "GET") {
        if (reqUrl == "/") {
            // Send a JSON version of our URL query
            res.write("Hello, you sent\n" + JSON.stringify(parsed.query))
            res.end()
        } else if (reqUrl == "/scan") {
            // res.write("Hello, you sent\n" +  JSON.stringify(parsed.query))
            console.log("scan request received: " + JSON.stringify(parsed.query))
            console.log("Tcp reactServer response " + tcpClient.sendScan(parsed.query))

            // Wait until
            setTimeout(() => {
                res.writeHead(200, headers)
                if (tcpClient.getError()) {
                    res.write(JSON.stringify(tcpClient.getError()))
                    tcpClient.clearError()
                    res.end()
                } else {
                    res.write('{"sent": "success"}')
                    res.end()
                }


            }, 2000);


        } else if (reqUrl == "/delete") {
            console.log("delete request received: " + JSON.stringify(parsed.query))
            tcpClient.remove(parsed.query)
            res.writeHead(200, headers)
            res.write('{"sent": "success"}')
            res.end()
        } else if (reqUrl == "/get") {
            console.log("Tcp reactServer response " + JSON.stringify(tcpClient.getResponse()))
            res.write(JSON.stringify(tcpClient.getResponse()))
            res.end()
        } else if (reqUrl == "/getAll") {
            // const parcels = [ { "id": "bba265e3", "title": "123651214", "description": "10 x 20 x 30", "lane" : "2" },
            //     { "id": "67e0b8a5", "title": "122432123", "description": "15 x 25 x 40", "lane" : "5" }];

            const parcels = tcpClient.getAll()
            res.writeHead(200, headers)
            res.write(JSON.stringify(parcels))
            res.end()
        }

    } else if (req.method == "POST") {
        if (reqUrl == "/hello") {
            res.write("hello world")
            res.end()
        }
    } else if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }


})
// Have the reactServer listen on port 9001
const port  = 9001
const hostname = os.hostname();
const ipVal = ip.address();
reactServer.listen(port)
console.log("React server started: " + hostname + '@' + port)
console.log("Or: " + ipVal + '@' + port)
console.log("Or: localhost@" + port)
