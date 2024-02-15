// const {io} = require('socket.io-client')
// const { sheetCache } = require('./utils/nodeCache')

// const socketLinks = [
//     // 'https://didactic-acorn-459wwgp77j72j9vv-5050.app.github.dev',
//     // 'http://localhost:5050',
//     'https://gsheetdb-socket1.onrender.com',
//     'https://gsheetdb-socket2.onrender.com'

// ]

// const multipleSockets = []

// const apikeyCache = {}
// const socketcache={}

// const connectToAllSocket = (multipleSockets,socketLinks,io,socketcache) =>{
//     socketLinks.map((eachLink,i)=>{
//         console.log(i)
//         const socket = io(eachLink)
//         multipleSockets.push(socket)
//         socketcache['socket'+i] = {
//             link:eachLink,
//             index:i,
//         }

//         socket.on('connect',()=>{
//             console.log('connected to socket '+i)
//             socketcache['socket'+i].connected = true 
//         })

//         socket.on('memory',(data)=>{
//             socketcache['socket'+i].memory = data
//         })
//     })
// }
// connectToAllSocket(multipleSockets,socketLinks,io,socketcache)



// const findSocketWithLessMemoryUsage = (multipleSockets,socketcache) => {
//     let min=socketcache['socket0'].memory.ram
//     let i=-1
//     var socketWhichHasMoreSpace = multipleSockets[0];
//     for(let key in socketcache){
//         i+=1
//         let ram = socketcache[key].memory.ram
//         if(min > ram){
//             min = ram
//             socketWhichHasMoreSpace = multipleSockets[i]
//         }
        
//     }
//     return {socket : socketWhichHasMoreSpace, minRam:min, index : i}
// }
// const setCache = (cache,key,value,time) => {
//     const {socket, min ,index} = findSocketWithLessMemoryUsage(multipleSockets,socketcache)
//     const data ={
//         key:key,
//         value:value,
//         time:time,
//         cache
//     }
//     apikeyCache[key] = 'socket'+index
//     socket.emit('set',data)

// }

// setTimeout(()=>{
//     var value = 'A'.repeat(1024*100)
//     // console.log(value)
//     console.log(socketcache)
//     // setCache('sheet','123apikey',value,1800)
//     let i=0
//     multipleSockets[0].on('clientGet',(response)=>{
//         console.log('response from socket 1 :',response)
//     })
//     setInterval(()=>{
//         // setCache('sheet','123apikey'+i,value,1800)
//         // multipleSockets[1].emit('get',{key:'123apikey'+i})
//         // console.log(apikeyCache)
//         // console.log(socketcache)
//         // i+=1
//         multipleSockets[0].emit('get',{key:'123apikey'+i})
//         i+=1
//     },5000)
//     // console.log(findSocketWithLessMemoryUsage(multipleSockets,socketcache))
// },15000)
// // multipleSockets.map( (socket,i)=>{
// //     socket.on('connect',()=>{
// //         console.log('connected to socket '+i)
// //         const data = {cache:'sheet',key:'hello',value:'hashim'}
// //         socket.emit('set',data)
// //         socket.emit('get', data)
// //         socket.on('clientGet',(response) => {
// //             console.log(response)
// //         })
        
// //     })
// // })

// multipleSockets



// module.exports = multipleSockets



const io = require('socket.io-client');

// List of server URLs
const servers = ['https://gsheetdb-socket1.onrender.com','https://gsheetdb-socket2.onrender.com'];

// Object to keep track of which server has which data
let serverData = {};
let dataServerMap = {};

// Function to get the server with the least RAM usage
function getLeastLoadedServer() {
    let min = Number.MAX_VALUE;
    let server = null;

    for (const [url, data] of Object.entries(serverData)) {
        if (data.ram < min) {
            min = data.ram;
            server = url;
        }
    }

    return server;
}

// Connect to each server
servers.forEach((server) => {
    const socket = io(server);

    socket.on('connect', () => {
        console.log(`Connected to ${server}`);
        
    });

    // Update serverData whenever 'memory' event is received
    socket.on('memory', (memory) => {
        serverData[server] = memory;
    });

    // Handle 'clientGet' event
    socket.on('clientGet', (data) => {
        console.log(`Received data from ${server}: ${data}`);
    });
});

// Function to get data
function getData(key) {
    const server = dataServerMap[key];
    if (server) {
        const socket = io(server);
        socket.emit('get', { key: key, cache: 'sheet' });
    } else {
        console.log(`No data found for key: ${key}`);
    }
}
function setData(key, value, time) {
    const server = getLeastLoadedServer();
    console.log(`data stored in ${server}`)
    const socket = io(server);
    socket.emit('set', { key: key, value: value, time: time, cache: 'sheet' });
    dataServerMap[key] = server;
}
let i=0
setInterval(()=>{
    value = i.toString().repeat(1024)
    setData(i,value,100)
    getData(i)
    console.log(dataServerMap)
    console.log(serverData)
    console.log('\n\n\n\n\n')
    i++
},5000)