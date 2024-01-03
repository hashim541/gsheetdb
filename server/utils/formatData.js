const formatData = (row,headers,returnData) => {

    const result={}

    row._rawData.map((data, i) => {
        if(returnData.length === 0){
            return result[headers[i]] = data
        }
        if(data.length > 0 && returnData.includes(headers[i])){
            return result[headers[i]] = data
        }
        
    })
    

    // if(returnData){
    //     if(returnData.length === 0){
    //         row._rawData.map((data, i) => {
    //             if(data.length > 0){
    //                 result[headers[i]] = data
    //             }
    //         })
    //     }else{

    //     }
    // }else{
    //     row._rawData.map((data, i) => {
    //         if(data.length > 0){
    //             result[headers[i]] = data
    //         }
    //     })
    // }
    row._rawData.map((data, i) => {
        if(data.length > 0 && returnData.includes(headers[i])){
            result[headers[i]] = data
        }
        
    })
    // console.log(result)
    return result
}

module.exports = formatData