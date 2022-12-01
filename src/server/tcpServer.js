// Reference: https://www.yld.io/blog/building-a-tcp-service-using-node-js/
var net = require('net');
var server = net.createServer();
server.on('connection', handleConnection);
server.listen(9000, function() {
    console.log('tcp server listening to %j', server.address());
});

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    conn.setEncoding('utf8');
    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
    function onConnData(d) {
        console.log('connection data from %s: %j', remoteAddress, d);
        // conn.write(d);
        // var msg = "Prefix Lane:" + randomIntFromInterval(1,20) + " Suffix"
        // var msg = '{"lane":"'+randomIntFromInterval(1,20) + '"}'
        var msg = '<STX>{"machine":"brunna_top","barcode":"TEST-PARCEL_07_004","lane":"'+randomIntFromInterval(1,20)+'"}<ETX>'

        setTimeout(() => {
            // console.log('hello world')
            conn.write(msg)
        }, 1000);

    }
    function onConnClose() {
        console.log('connection from %s closed', remoteAddress);
    }
    function onConnError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }
}

