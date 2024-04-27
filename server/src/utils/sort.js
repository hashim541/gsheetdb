const sortMethod = (sort,result,schemaKeys) => {
    const sortArray=['asc','desc']
    if(!sort.includes(':')){
        throw new Error(`invalid sort query, it must be like header:(asc || desc)`)
    }
    const [sortHeader,sortOrder] = sort.split(':')
    const type = schemaKeys[sortHeader].type

    if (type == undefined){
        throw new Error(`you cannot sort by ${sortHeader},beacuse it dosen't exists in header.`)
    }
    if(type == 'array' || type == 'object' ){
        throw new Error(`you cannot sort by ${type}`)
    }
    if (!sortArray.includes(sortOrder)){
        throw new Error(`you cannot sort in order by ${sortOrder}`)
    }
    switch(type){
        case 'string':
          return result.sort((a, b) => {
            const aValue = a[sortHeader];
            const bValue = b[sortHeader];
            if(sortOrder == 'asc'){
              return aValue.localeCompare(bValue);
            }
            return bValue.localeCompare(aValue);
          });
        case 'number':
            if(sortOrder == 'asc'){
                return result.sort( (a,b) => eval(`a.${sortHeader} - b.${sortHeader}`))
            }else{
                return result.sort((a,b) => eval(`b.${sortHeader} - a.${sortHeader}`))
            }
        case 'boolean':
            if(sortOrder == 'asc'){
                return result.sort((a, b) => {
                   if (a[sortHeader] === undefined) {
                    return 1;
                  }
                  
                  if (b[sortHeader] === undefined) {
                    return -1;
                  }

                  if (a[sortHeader] === b[sortHeader]) {
                    return 0;
                  } else if (a[sortHeader]) {
                    return -1;
                  } else {
                    return 1;
                  }
                });
                
            }else{
                return result.sort((a, b) => {
                    
                    if (a[sortHeader] === undefined) {
                        return -1; 
                      }
                      
                      if (b[sortHeader] === undefined) {
                        return 1;
                      }
                    
                    if (a[sortHeader] === b[sortHeader]) {
                      return 0;
                    } else if (a[sortHeader]) {
                      return 1;
                    } else {
                      return -1;
                    }
                  });
            }
        default:
            console.log('default sort case')
    }
}


module.exports = sortMethod