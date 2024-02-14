const {io} = require('socket.io-client')
const { sheetCache } = require('./utils/nodeCache')

const socketLinks = [
    'https://didactic-acorn-459wwgp77j72j9vv-5050.app.github.dev',
    'https://didactic-acorn-459wwgp77j72j9vv-5051.app.github.dev',

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
const setCache = (cache,key,value,apikeyCache,multipleSockets,socketcache) => {
    const {socket, min ,index} = findSocketWithLessMemoryUsage(multipleSockets,socketcache)
    const data ={
        key:key,
        value:value,
        time:1800,
        cache
    }
    apikeyCache[key] = 'socket'+index
    socket.emit('set',data)

}

setTimeout(()=>{
    var value = 'heyjeuioirgjpaeoriguiropapougpaierugioarjvbiorjaeipoguiaperougioajioaeipjjgeaijgiaperohgioaperhuiyaetubhuaenguaegupaepogiaeoptguaioetpugiouoiaetguaeoghiotjiaeogjiopeajgejgiojeiogjiojgioaejoigjaeio'
    console.log(socketcache)
    setCache('sheet','123apikey',value,apikeyCache,multipleSockets,socketcache)
    setTimeout(()=>{
        value='hey'
        setCache('sheet','123apikey2',value,apikeyCache,multipleSockets,socketcache)
        console.log(apikeyCache)
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