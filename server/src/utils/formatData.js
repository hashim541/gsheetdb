const formatData = (row, headers, schemaKeys, returnData) => {
    const result = {};
    const returnDataSet = new Set(returnData);
    result._rowNumber=row._rowNumber
    row._rawData.forEach((data, i) => {
        if (data.length > 0 && (returnDataSet.size === 0 || returnDataSet.has(headers[i]))) {
            result[headers[i]] = convertToDataType(data,schemaKeys[headers[i]].type);
        }
    });

    return result;
};
const convertToDataType = (data,type) => {
    switch(type){
        case 'number':
            return Number(data)
        case 'boolean':
            if(data == 'TRUE'){
                return true
            }else{
                return false
            }
        case 'array':
            return JSON.parse(data)
        case 'object':
            return JSON.parse(data)
        default :
            return data
    }
}

module.exports = {formatData,convertToDataType}