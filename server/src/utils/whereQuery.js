const getType = require('./getType')

const whereForEachType = {
    number:['==','!=','<=','>=','<','>','between','isEmpty'],
    string:['==','!=','includes','!includes','startsWith','endsWith','isEmpty'],
    boolean:['==','!=','isEmpty'],
    array:['includes','!includes','isEmpty'],
    object:['hasKey','!hasKey','isEmpty']

}

const whereQuery = ( rows, key, keyType, value, where, type ) => {
    
    if ( !whereForEachType[keyType].includes(where) ){
        invalidWhere( key, keyType, where, value)
    }
    if(where == 'between'){
        const valueType = getType(value);
        if (valueType !== 'array' || value.length !== 2) {
            throw new Error(`value parameter must be an array [min, max]`);
        }
        if(typeof value[0] != 'number' && typeof value[1] != 'number'){
            throw new Error(`both ${value[0]} and ${value[1]} must be of type number`)
        }
    }else{
        if( keyType != getType(value) && keyType != 'array' &&  keyType != 'object'){
            throw new Error(`${value} must be of type ${keyType}, because ${key} is type of ${keyType}`)
        }
    }
    return caseWhere( where, rows, key, keyType, value, type )   

}


const invalidWhere = ( key, keyType, where, value) => {
    throw new Error(`cannot perform ${key} ${where} ${value} on a ${keyType}`)
}

const caseWhere = (where, rows, key, keyType, value, type) => {
    
    switch (where) {
        
        case '==':
        case '!=':
            const keyVal = keyType === 'boolean' ? (value === true ? 'TRUE' : 'FALSE') : null;
            if (keyType === 'boolean') {
                if (type === 'one') {
                    return rows.find((row) => row.get(`${key}:${keyType}`) == keyVal);
                }
                return rows.filter((row) => row.get(`${key}:${keyType}`) == keyVal);
            }
            if (type === 'one') {
                return rows.find((row) => eval(`row.get('${key}:${keyType}') ${where} value`));
            }
            return rows.filter((row) => eval(`row.get('${key}:${keyType}') ${where} value`));


        case '<=':
        case '>=':
        case '<':
        case '>':
            const comparisonOperator = where;
            if (type === 'one') {
                return rows.find((row) => eval(`row.get('${key}:${keyType}') ${comparisonOperator} value`));
            }
            return rows.filter((row) => eval(`row.get('${key}:${keyType}') ${comparisonOperator} value`));


        case 'between':
            const [minValue, maxValue] = value;
            const result = rows.filter((row) => {
                const rowValue = row.get(`${key}:${keyType}`);
                return rowValue >= minValue && rowValue <= maxValue;
            });
            return type === 'one' ? result[0] : result;
            
        case 'includes':
        case '!includes' :
            const includesOrNot = where == '!includes' ? '!' : ''
            if (keyType === 'array') {
                const filteredRows = rows.filter((row) => {
                    const rowVal = row.get(`${key}:${keyType}`);
                    return rowVal !== undefined && eval(`${includesOrNot}JSON.parse(rowVal).includes(value)`)
                });
                return type === 'one' ? filteredRows[0] : filteredRows;
            }
            if (type === 'one') {
                return rows.find((row) =>eval(`${includesOrNot}row.get('${key}:${keyType}').includes(value)`) );
            }
            return rows.filter((row) => eval(`${includesOrNot}row.get('${key}:${keyType}').includes(value)`));


        case 'startsWith':
        case 'endsWith':
            const stringFunction = where === 'startsWith' ? 'startsWith' : 'endsWith';
            if (type === 'one') {
                return rows.find((row) => row.get(`${key}:${keyType}`)[stringFunction](value));
            }
            return rows.filter((row) => row.get(`${key}:${keyType}`)[stringFunction](value));


        case 'hasKey':
        case '!hasKey':
            const notHasKey = where == '!hasKey' ? '!' : ''
            const filteredRows = rows.filter((row) => {
                const rowVal = row.get(`${key}:${keyType}`);
                return rowVal !== undefined && eval(`${notHasKey}JSON.parse(rowVal)[value]`);
            });
            return type === 'one' ? filteredRows[0] : filteredRows;
        
        
        case 'isEmpty':
            console.log('isEmpty')
            const isEmptyRows = rows.filter((row) => {
                const rowVal = row.get(`${key}:${keyType}`);
                if(keyType == 'number' || keyType == 'string' || keyType == 'boolean'){
                    return rowVal.length == 0 || rowVal == undefined
                }else{
                    console.log(rowVal)
                    return rowVal == undefined || JSON.parse(rowVal) == [] || JSON.parse(rowVal) == {}   
                } 
            })
            console.log(isEmptyRows)
            return type == 'one' ? isEmptyRows[0] : isEmptyRows;


        default:
            console.log('default in case where');
            return null;
    }
};


module.exports = whereQuery
