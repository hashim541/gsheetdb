const formatData = (rows,index, headers, returnData) => {
    const result = {};
    const returnDataSet = new Set(returnData);
    const rData = [...returnDataSet]
    headers.forEach(head => {
        if(rData.length === 0 && head.length!==0){
            result[head] = rows[head][index]

        }else{
            if(rData.includes(head)){
                result[head] = rows[head][index]
            }
        }
    })

    // row._rawData.forEach((data, i) => {
    //     if (data.length > 0 && (returnDataSet.size === 0 || returnDataSet.has(headers[i]))) {
    //         result[headers[i]] = data;
    //     }
    // });

    return result;
};

module.exports = formatData