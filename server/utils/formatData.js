const formatData = (row,headers) => {
    const result={}
    row._rawData.map((data, i) => {
        if(data.length > 0){
            result[headers[i]] = data
        }
    })
    return result
}

module.exports = formatData