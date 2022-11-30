const net = require('net');

// Local '127.0.0.1' 9000
// Stockholm Office Terminal server '192.168.1.128' 48898
// const tcpServerHost = '192.168.1.128'
// const tcpServerPort = 48898
const tcpServerHost = '127.0.0.1'
const tcpServerPort = 9000

var parcels = []
var obj = {}

function extractLaneFromTcpResponse(tcpResponse){
    const trimmedVal = String(tcpResponse).replace("<STX>", "").replace("<ETX>", "")
    const jsonObj = JSON.parse(trimmedVal)
    return jsonObj.lane
}

function addObjToScanList(lane) {
    if(parcels.length > 9){
        parcels.shift()
    }

    const parcelObj = {"title": obj.barcode, "description": obj.L + " " + obj.W + " " + obj.H, "lane": lane, "uuid": obj.uuid}
    console.log("Obj added to parcels array:" + JSON.stringify(parcelObj))
    parcels.push(parcelObj)
    obj = {}
}

module.exports.sendScan = function (scanObject){
    client = new net.Socket();
    client.connect(tcpServerPort, tcpServerHost, function() {
        console.log('TCP Connected at :' + tcpServerHost + ":" + tcpServerPort);
        // Expected format: <STX>{"machine":"brunna_top","barcodes":["TEST-PARCEL_07_004"],"dimensions":{"width":0.390,"height":0.400,"length":0.576},"sickVolumeState":["0000","00000000","00000001"]}<ETX>

        scanObject.barcode = scanObject.barcode.replace(/[?]/g,"_")
        console.log("Barcode: " + scanObject.barcode)

        const objToSend = '<STX>{"machine":"brunna_top","barcodes":["'+scanObject.barcode+'"],"dimensions":{"width":0.390,"height":0.400,"length":0.576},"sickVolumeState":["0000","00000000","00000001"]}<ETX>\n'
        console.log("Sending TCP string: " + objToSend)
        client.write(objToSend);
        // client.write(JSON.stringify(objToSend));
        obj = scanObject
        // console.log("Obj: " + JSON.stringify(obj))
    });

    client.on('data', function(data) {
        console.log('TCP Received: ' + data);
        client.destroy(); // kill client after server's response

        const lane = extractLaneFromTcpResponse(data)
        addObjToScanList(lane)
    });

    client.on('close', function() {
        console.log('TCP Connection closed');
    });
}

module.exports.getResponse = function (){
    return obj
}

module.exports.getAll = function (){
    const parcelsToSend = [...parcels]
    return parcelsToSend.reverse()
}

module.exports.remove = function (query){
    console.log(query.barcode)
    const indexOfObject = parcels.findIndex(parcel => {
        return parcel.barcode === query.barcode;
    });
    parcels.splice(indexOfObject, 1);
    console.log("Parcels count: " + parcels.length)
}

