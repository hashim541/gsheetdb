const formatData = (row, headers, dataType, returnData) => {
    const result = {};
    const dType=['str','num','bool','date','arr','obj']
    const returnDataSet = new Set(returnData);
    row._rawData.forEach((data, i) => {
        if (data.length > 0 && (returnDataSet.size === 0 || returnDataSet.has(headers[i]))) {
            result[headers[i]] = convertToDataType(data,dataType[headers[i]]);
        }
    });

    return result;
};
const convertToDataType = (data,type) => {
    switch(type){
        case 'num':
            return Number(data)
        case 'bool':
            if(data == 'TRUE'){
                return true
            }else{
                return false
            }
        case 'arr':
            return JSON.parse(data)
        case 'obj':
            return JSON.parse(data)
        default :
            return data
    }
}

module.exports = {formatData,convertToDataType}