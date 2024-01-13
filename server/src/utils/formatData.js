const formatData = (row, headers, returnData) => {
    const result = {};
    const returnDataSet = new Set(returnData);
    row._rawData.forEach((data, i) => {
        if (data.length > 0 && (returnDataSet.size === 0 || returnDataSet.has(headers[i]))) {
            result[headers[i]] = data;
        }
    });

    return result;
};

module.exports = formatData