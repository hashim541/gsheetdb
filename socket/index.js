const NodeCache = require('node-cache')
const used = process.memoryUsage()
var port = 5050
const io = require('socket.io')(port,{
    cors : {
        origin : [ 'https://didactic-acorn-459wwgp77j72j9vv-3000.app.github.dev' ]
    }
})

const sheetCache = new NodeCache()
const apikeyCache = new NodeCache()

io.on('connection' , (socket) => {
    console.log('port 1')
    console.log(socket.id)
    socket.on('get' , (data) => {
        const key = data.key
        const cache = data.cache
        var result = null
        if(cache == 'sheet'){
            result = sheetCache.get(key)
        }else if(cache == 'apikey'){
            result = apikeyCache.get(key)
        }
        console.log(result)
        io.emit('clientGet',result)
    })

    socket.on('set',(data)=>{
        var key = data.key
        var value = data.value
        var time = data.time
        var cache = data.cache
        console.log(data)
        if (cache == 'sheet'){
            if (time) sheetCache.set(key,value,time)
            else sheetCache.set(key,value)
        }else if(cache == 'apikey'){
            if (time) apikeyCache.set(key,value,time)
            else apikeyCache.set(key,value)
        } 
    })

    setInterval(()=>{
        const formatMemory = {
            heapTotla : Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
            heapUSed : Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
            external : Math.round(used.external / 1024 / 1024 * 100) / 100,
            ram : Math.round(used.rss / 1024 / 1024 * 100) / 100
        }
        socket.emit('memory',formatMemory)
    },2000)
})

