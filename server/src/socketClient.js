const {io} = require('socket.io-client')
const { sheetCache } = require('./utils/nodeCache')

const socketLinks = [
    'https://didactic-acorn-459wwgp77j72j9vv-5050.app.github.dev',
    'http://localhost:5050',

]

const multipleSockets = []

const apikeyCache = {}
const socketcache={}

const connectToAllSocket = (multipleSockets,socketLinks,io,socketcache) =>{
    socketLinks.map((eachLink,i)=>{
        console.log(i)
        const socket = io(eachLink)
        multipleSockets.push(socket)
        socketcache['socket'+i] = {
            link:eachLink,
            index:i,
        }

        socket.on('connect',()=>{
            console.log('connected to socket '+i)
            socketcache['socket'+i].connected = true 
        })

        socket.on('memory',(data)=>{
            socketcache['socket'+i].memory = data
        })
    })
}
connectToAllSocket(multipleSockets,socketLinks,io,socketcache)



const findSocketWithLessMemoryUsage = (multipleSockets,socketcache) => {
    let min=socketcache['socket0'].memory.ram
    let i=-1
    var socketWhichHasMoreSpace = multipleSockets[0];
    for(let key in socketcache){
        i+=1
        let ram = socketcache[key].memory.ram
        if(min > ram){
            min = ram
            socketWhichHasMoreSpace = multipleSockets[i]
        }
        
    }
    return {socket : socketWhichHasMoreSpace, minRam:min, index : i}
}
const setCache = (cache,key,value,time) => {
    const {socket, min ,index} = findSocketWithLessMemoryUsage(multipleSockets,socketcache)
    const data ={
        key:key,
        value:value,
        time:time,
        cache
    }
    apikeyCache[key] = 'socket'+index
    socket.emit('set',data)

}

setTimeout(()=>{
    var value = 'A'.repeat(1024*100)
    // console.log(value)
    console.log(socketcache)
    setCache('sheet','123apikey',value,1800)
    let i=0
    setInterval(()=>{
        setCache('sheet','123apikey'+i,value,1800)
        multipleSockets[1].emit('get',{key:'123apikey'+i})
        console.log(apikeyCache)
        console.log(socketcache)
        i+=1
    },5000)
    // console.log(findSocketWithLessMemoryUsage(multipleSockets,socketcache))
},15000)
// multipleSockets.map( (socket,i)=>{
//     socket.on('connect',()=>{
//         console.log('connected to socket '+i)
//         const data = {cache:'sheet',key:'hello',value:'hashim'}
//         socket.emit('set',data)
//         socket.emit('get', data)
//         socket.on('clientGet',(response) => {
//             console.log(response)
//         })
        
//     })
// })

multipleSockets



module.exports = multipleSockets