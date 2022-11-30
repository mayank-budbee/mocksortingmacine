var str = "TEST-PARCEL?07?004"
var rep = str.replace("?", "_")
console.log(rep)

rep = str.replace(/[?]/g, "_")
console.log(rep)



