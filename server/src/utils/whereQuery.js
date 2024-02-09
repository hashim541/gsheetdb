const getType = require('./getType')

const whereForEachType = {
    number:['==','!=','<=','>=','<','>'],
    string:['==','!=','includes','startsWith','endsWith'],
    boolean:['true','false'],
    array:['includes'],
    object:['has']

}

const whereQuery = ( rows, key, keyType, value, where, type ) => {
    console.log(rows.length , key, keyType,where,value)
    if(keyType != getType(value) && keyType != 'array'){
        throw new Error(`${value} must be of type ${keyType}, because ${key} is type of ${keyType}`)
    }

    switch(keyType){
        case 'number' :
            if ( !whereForEachType.number.includes(where) ){
                invalidWhere( key, keyType, where, value)
            }
            return caseWhere( where, rows, key, keyType, value, type )
        case 'string' :
            if ( !whereForEachType.string.includes(where) ){
                invalidWhere( key, keyType, where, value)
            }
            return caseWhere( where, rows, key, keyType, value, type )
        case 'array' :
            if ( !whereForEachType.array.includes(where) ){
                invalidWhere( key, keyType, where, value)
            }
            return caseWhere( where, rows, key, keyType, value, type )
            
    }
}


const invalidWhere = ( key, keyType, where, value) => {
    throw new Error(`cannot perform ${key} ${where} ${value} on a ${keyType}`)
}

const caseWhere = ( where, rows, key, keyType, value, type ) => {
    switch(where){
        case '==' :
            if (type == 'one'){
                console.log('hhh')
                return rows.find((row) => row.get(`${key}:${keyType}`) == value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) == value);
            }
        case '!=' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`) != value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) != value);
            }
        case '<=' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`) <= value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) <= value);
            }
        case '>=' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`) >= value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) >= value);
            }
        case '<' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`) < value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) < value);
            }
        case '>' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`) > value);
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`) > value);
            }
        case 'includes' :
            if(keyType == 'array'){
                if (type == 'one'){
                    return rows.find((row) =>{
                        console.log( typeof row.get(`${key}:${keyType}`) )
                        if(row.get(`${key}:${keyType}`).includes(value)){
                            return row
                        }
                    } );
                }
                if(type == 'many'){
                    return rows.filter((row) => row.get(`${key}:${keyType}`).includes(value));
                }
            }
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`).includes(value));
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`).includes(value));
            }
        case 'startsWith' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`).startsWith(value));
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`).startsWith(value));
            }
        case 'endsWith' :
            if (type == 'one'){
                return rows.find((row) => row.get(`${key}:${keyType}`).endsWith(value));
            }
            if(type == 'many'){
                return rows.filter((row) => row.get(`${key}:${keyType}`).endsWith(value));
            }
        default:
            console.log('default in case where')
    }
}

module.exports = whereQuery
